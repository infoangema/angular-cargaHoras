import { User } from "./user";
import { Project } from "./project";
import { UserResponse } from "../core/login/model/userAuthenticated";

export interface Record {
  id?: number,
  date: string,
  hours: number,
  description: string,
  user: UserResponse | undefined,
  project: Project,
  visible?: boolean
  rol?: string,
  status?: boolean
}
