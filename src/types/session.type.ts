export type Session = {
  user: UserSession;
};

export type UserSession = {
  id: number;
  email: string;
  username: string;
  name: string;
  lastName?: string;
  status: "CUSTOMER" | "EMPLOYEE";
  avatarUrl?: string;
};
