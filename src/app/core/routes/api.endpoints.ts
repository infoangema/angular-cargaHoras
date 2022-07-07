import { environment as ENV } from "../../../environments/environment.dev";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ ENV.URL_BASE }/auth/login?grant_type=client_credentials`,
    LOGOUT: `${ ENV.URL_BASE }/auth/logout`,
  },
  RESOURCES: {
    GLOBAL: `${ ENV.URL_BASE }`,
    USER: `${ENV.URL_BASE}/users`,
//    USER: `${ ENV.URL_BASE }/usuarios/obtener/lista`,
    PROYECTOS: `${ ENV.URL_BASE }/proyectos`,
    RECORDS: `${ ENV.URL_BASE }/records`,
  }
}
