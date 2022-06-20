import { environment as ENV } from "../../../environments/environment.dev";

export const ENDPOINTS_API = {
  AUTH: {
    LOGIN: `${ENV.uri}/login`,
    LOGOUT: `${ENV.uri}/auth/logout`,
  }
}
