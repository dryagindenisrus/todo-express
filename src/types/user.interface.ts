export interface ShortUser {
  
}

export interface User extends ShortUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  avatarpath?: string;
}