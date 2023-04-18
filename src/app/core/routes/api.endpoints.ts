import { environment as ENV } from "../../../environments/environment.dev";

//export let API_ENDPOINTS: {
//  RESOURCES: { RECORDS: string; PROYECTOS: string; GLOBAL: string; USER: string };
//  AUTH: { LOGOUT: string; LOGIN: string }
//};
export let API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ENV.URL_BASE}/auth/login?grant_type=client_credentials`,
    LOGOUT: `${ENV.URL_BASE}/auth/logout`,
  },
  USER: {
    USER_BY_ID:`${ENV.URL_BASE}/users/read`
  },
  RESOURCES: {
    GLOBAL: `${ENV.URL_BASE}`,
    USER: `${ENV.URL_BASE}/users/read`,
    PROYECTOS: `${ENV.URL_BASE}/projects/read`,
    RECORDS: `${ENV.URL_BASE}/records`,
  }
};
