import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  AUTH: {
    LOGIN: `${ENV.uri}/auth/login?grant_type=client_credentials`,
    LOGOUT: `${ENV.uri}/auth/logout`,
  },
  RESOURCES: {
    GLOBAL: `${ENV.uri}`,
    USER: `${ENV.uri}/users`,
    PROJECT: `${ENV.uri}/projects`,
    RECORDS: `${ENV.uri}/records`,
  }
}
