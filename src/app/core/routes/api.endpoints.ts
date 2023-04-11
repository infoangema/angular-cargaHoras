import { environment as ENV } from "../../../environments/environment.dev";

export let API_ENDPOINTS: {
  RESOURCES: { RECORDS: string; PROYECTOS: string; GLOBAL: string; USER: string };
  AUTH: { LOGOUT: string; LOGIN: string }
};
API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ENV.URL_BASE}/auth/login?grant_type=client_credentials`,
    LOGOUT: `${ENV.URL_BASE}/auth/logout`,
  },
  RESOURCES: {
    GLOBAL: `${ENV.URL_BASE}`,
    USER: `${ENV.URL_BASE}/auth/users`,
    PROYECTOS: `${ENV.URL_BASE}/proyectos`,
    RECORDS: `${ENV.URL_BASE}/records`,
  }
};
