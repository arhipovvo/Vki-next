import fs from 'fs/promises';
import path from 'path';

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Путь к файлу базы данных
const dbPath = path.join(process.cwd(), 'data', 'students.json');

// Инициализация базы данных (создание файла если не существует)
async function initDb(): Promise<void> {
  try {
    await fs.access(dbPath);
  } catch {
    // Если файла нет - создаем его с пустым массивом
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify([], null, 2));
    console.log('✅ База данных создана:', dbPath);
  }
}

// Чтение всех студентов
export async function readStudents(): Promise<Student[]> {
  await initDb();
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка чтения базы данных:', error);
    return [];
  }
}

// Запись студентов в файл
export async function writeStudents(students: Student[]): Promise<void> {
  try {
    await fs.writeFile(dbPath, JSON.stringify(students, null, 2));
  } catch (error) {
    console.error('Ошибка записи в базу данных:', error);
    throw error;
  }
}

// Добавление нового студента
export async function addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
  const students = await readStudents();
  
  // Генерация ID (максимальный существующий + 1)
  const newId = students.length > 0 
    ? Math.max(...students.map(s => s.id)) + 1 
    : 1;

  const newStudent: Student = {
    id: newId,
    ...studentData
  };
  
  students.push(newStudent);
  await writeStudents(students);
  
  return newStudent;
}

// Поиск студента по email
export async function findStudentByEmail(email: string): Promise<Student | undefined> {
  const students = await readStudents();
  return students.find(student => student.email === email);
}