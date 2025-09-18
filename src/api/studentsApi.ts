import type StudentsInterface from '@/types/Studentsinterface';

export const getStudentsApi = async (): Promise<StudentsInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentsInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as StudentsInterface[];
  }
};
