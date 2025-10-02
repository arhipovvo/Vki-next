'use client';

import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import useStudents from '@/hooks/useStudents';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  const onDeleteHandler = (id: number) =>  {
   console.log(id);
  }

  return (
    <div className={styles.Students}>
     
      {students.map((student: StudentInterface) => (
       <Student student={student} onDelete={onDeleteHandler} />
      ))}
    </div>
  );
};

export default Students;
