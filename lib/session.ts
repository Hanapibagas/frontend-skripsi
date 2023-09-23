import type { IronSessionOptions } from "iron-session";

export interface SavedSession {
  token?: string;
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "fanvercel/sess",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user: SavedSession;
  }
}
