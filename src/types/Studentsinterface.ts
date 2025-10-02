interface StudentsInterface {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  groupId: number;
  isDeleted?: boolean;
};

export default StudentsInterface;
