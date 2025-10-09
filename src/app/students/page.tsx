'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AddStudent from '@/components/AddStudent';

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface StudentFormData {
  name: string;
  email: string;
  age: number;
}

export default function Students() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  // Запрос для получения студентов
  const { data: students, isLoading, error } = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await fetch('/api/students');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке студентов');
      }
      return response.json();
    },
  });

  // Мутация для добавления студента
  const addStudentMutation = useMutation({
    mutationFn: async (studentData: StudentFormData) => {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении студента');
      }

      return response.json();
    },
    onSuccess: () => {
      // Инвалидируем кэш студентов чтобы обновить список
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsAdding(false);
    },
    onError: (error) => {
      console.error('Ошибка добавления:', error);
      alert('Произошла ошибка при добавлении студента');
    },
  });

  const handleAddStudent = (studentData: StudentFormData) => {
    setIsAdding(true);
    addStudentMutation.mutate(studentData);
  };

  if (isLoading) return <div className="container mx-auto p-4">Загрузка...</div>;
  if (error) return <div className="container mx-auto p-4">Ошибка: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Список студентов</h1>
      
      {/* Компонент добавления студента */}
      <AddStudent 
        onAddStudent={handleAddStudent} 
        isPending={isAdding}
      />

      {/* Список студентов */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Имя
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Возраст
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students?.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.age}
                </td>
              </tr>
            ))}
            {students?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Нет студентов
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}