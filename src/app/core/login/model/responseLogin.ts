import { UserAuthenticated } from "./userAuthenticated";

export interface ResponseLogin {
  error: boolean,
  message: string | undefined,
  body?: Body | null
}

interface Body {
  user?: UserAuthenticated | null,
  token?: string | null
}
