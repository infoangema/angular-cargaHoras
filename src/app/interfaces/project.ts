import { Company } from "./company";

export interface Project {
  id: number,
  name: string,
  description: string,
  company : Company,
  status: boolean,

}
