import { getstudentsDb } from '@/db/studentsDb';

export async function GET(): Promise<Response> {
  const students = await getstudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
