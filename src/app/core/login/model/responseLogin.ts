import { Auth } from "./userAuthenticated";

export interface ResponseLogin {
  error: boolean,
  message: string | undefined,
  body?: Body | null
}

interface Body {
  user?: Auth | null,
  token?: string | null
}
