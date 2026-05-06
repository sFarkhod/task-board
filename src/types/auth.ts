export interface User {
  id: string;
  nickname: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  user: User | undefined;
  accessToken: string;
}
