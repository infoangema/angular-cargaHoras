
export interface UserAuthenticated {
  id: number;
  active: boolean;
  username: string;
  roles: Role[];
}

export interface Role {
  id: number;
  description: string;
}
