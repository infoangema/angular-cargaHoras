import { AuthDto } from "./userAuthenticated";

export interface ResponseLogin {
  error: boolean,
  message: string | undefined,
  body?: Body | null
}

interface Body {
  user?: AuthDto | null,
  token?: string | null
}
