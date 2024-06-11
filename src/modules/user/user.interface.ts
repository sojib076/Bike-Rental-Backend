type UserRole = 'admin' | 'user';

export type TuserLogin= {
    email: string;
    password: string;
  };

  
  export type TuserRegister = {
      name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: UserRole;
}