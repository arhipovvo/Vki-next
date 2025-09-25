'use client';

import type Studentsinterface from '@/types/Studentsinterface';
import styles from './Students.module.scss';
import useStudents from '@/hooks/useStudents';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div className={styles.Students}>
     
      {students.map((student: Studentsinterface) => (
        <h2 key={student.id}>
          {student.first_name}
          {student.last_name}
          {student.middle_name}
          {student.groupId}
        </h2>
      ))}
    </div>
  );
};

export default Students;
