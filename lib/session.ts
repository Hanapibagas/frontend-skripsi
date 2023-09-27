import type { IronSessionOptions } from "iron-session";

export interface SavedSession {
  token?: string;
}

export const sessionOptions: IronSessionOptions = {
  password: "qwertyuioplkjhgfdsazxcvbnmnbvcxz",
  cookieName: "cookieName",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user: SavedSession;
  }
}
