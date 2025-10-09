'use client';

import { useForm } from 'react-hook-form';

interface StudentFormData {
  name: string;
  email: string;
  age: number;
}

interface AddStudentProps {
  onAddStudent: (data: StudentFormData) => void;
  isPending?: boolean;
}

export default function AddStudent({ onAddStudent, isPending }: AddStudentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>();

  const onSubmit = (data: StudentFormData) => {
    onAddStudent(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Добавить студента</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Имя
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { 
              required: 'Имя обязательно',
              minLength: { value: 2, message: 'Минимум 2 символа' }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите имя студента"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email адрес'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите email студента"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Возраст
          </label>
          <input
            id="age"
            type="number"
            {...register('age', { 
              required: 'Возраст обязателен',
              min: { value: 16, message: 'Минимальный возраст 16 лет' },
              max: { value: 100, message: 'Максимальный возраст 100 лет' },
              valueAsNumber: true
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Введите возраст студента"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Добавление...' : 'Добавить студента'}
        </button>
      </form>
    </div>
  );
}