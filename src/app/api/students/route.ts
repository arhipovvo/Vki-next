import { NextRequest, NextResponse } from 'next/server';
import { readStudents, addStudent, findStudentByEmail } from '@C/data/lib/json-db.ts';

// GET /api/students - получить всех студентов
export async function GET() {
  try {
    const students = await readStudents();
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Ошибка при загрузке студентов' },
      { status: 500 }
    );
  }
}

// POST /api/students - добавить нового студента
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    // Валидация обязательных полей
    if (!name || !email || !age) {
      return NextResponse.json(
        { error: 'Все поля (имя, email, возраст) обязательны' },
        { status: 400 }
      );
    }

    // Валидация возраста
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 16 || ageNumber > 100) {
      return NextResponse.json(
        { error: 'Возраст должен быть числом от 16 до 100 лет' },
        { status: 400 }
      );
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный email адрес' },
        { status: 400 }
      );
    }

    // Проверка на уникальность email
    const existingStudent = await findStudentByEmail(email);
    if (existingStudent) {
      return NextResponse.json(
        { error: 'Студент с таким email уже существует' },
        { status: 400 }
      );
    }

    // Создание студента
    const newStudent = await addStudent({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      age: ageNumber
    });

    return NextResponse.json(newStudent, { status: 201 });

  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}