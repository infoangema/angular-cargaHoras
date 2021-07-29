import { User } from "./user";
import { Project } from "./project";

export interface Template {
    date: string,
    hours: number,
    description: string,
    user: User,
    project: Project
}
