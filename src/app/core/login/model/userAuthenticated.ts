export interface GlobalResponse {
  status: string,
  path: string,
  timestamp: string,
  body: any,
  "error": string
}

export interface Authresponse {
  access_token: string,
  token_type: string,
  expires_in: string,
  refresh_token: string,
  issued_at: string,
  user_id: number,
  auth_data: AuthDto,
}

export interface AuthDto {
  id: number,
  active: boolean,
  username: string,
  roles: Role[]
}

export interface Role {
  id: number,
  descripcion: string
}

export interface UserResponse {
  id: number,
  name: string,
  lastName: string,
  email: string,
  phone: string,
  active: boolean,
  projects: Project[]
}

export interface Project {
  id: number,
  name: string,
  description: string,
  company: Company,
  status: boolean
}

export interface Company {
  id: number,
  name: string,
  description: string,
  cuit: string,
  direction: string
}


//export interface UserAuthenticated {
//  id: number;
//  active: boolean;
//  username: string;
//  roles: Role[];
//}
//
//export interface Role {
//  id: number;
//  description: string;
//}
