export class GlobalResponse {
  status: string = '';
  path: string = '';
  timestamp: string = '';
  body: any;
  error: string = '';
}

export class Authresponse {
  access_token: string = '';
  token_type: string = '';
  expires_in: string = '';
  refresh_token: string = '';
  issued_at: string = '';
  user_id: number | undefined = undefined;
  auth_data: Auth = new Auth();
}

export class Auth {
  id: number | undefined = undefined;
  active: boolean =true;
  username: string = '';
  roles: Role[] = [];
}

export class Role {
  id: number | undefined = undefined;
  description: string = '';
}

export class User {
  id: number | undefined = undefined;
  name: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  active: boolean =true;
  projects: Project[] = [];
}

export class Project {
  id: number | undefined = undefined;
  name: string = '';
  description: string = '';
  company: Company = new Company();
  status: boolean = true;
}

export class Company {
  id: number | undefined = undefined;
  name: string = '';
  description: string = '';
  cuit: string = '';
  direction: string = '';
}

export class Record {
  id: number | undefined = undefined;
  date: string = '';
  hours: number | undefined = undefined;
  description: string = '';
  user: User = new User();
  project: Project = new Project();
  visible: boolean = true;
  rol?: string = '';
  status: boolean = true;
}
