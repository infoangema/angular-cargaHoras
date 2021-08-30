import { User } from "./user";
import { Project } from "./project";

export interface Record {
  id?: number,
  date: string,
  hours: number,
  description: string,
  user: User,
  project: Project,
  visible?: boolean
  rol?: string,
  status?: boolean
}
