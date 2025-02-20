export interface RegisterInterface {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    user_id: string;
    name: string;
    email: string;
    role: Role.RENTER | Role.HOSTER;
    avatar: string | null;
  };
}

enum Role {
  RENTER = 'RENTER',
  HOSTER = 'HOSTER',
}

export interface UserInterface {
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  password: string;
  confirmPassword: string;
}
