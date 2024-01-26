export type UserType = {
  id: number;
  email: string;
  username: string;
  name: string;
  lastName?: string;
  status: "CUSTOMER" | "EMPLOYEE";
  avatarUrl?: string;
};
