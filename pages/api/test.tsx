import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { IronSessionData } from "iron-session";
import { sessionOptions } from "../../lib/session";
export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.body.method === "logout") {
        return req.session.destroy();
      }

      const saveSess = async (r: IronSessionData) => {
        req.session.user = {
          token: r.user.token,
        };
        await req.session.save();
      };

      const resx = await fetch("API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: req.body.username,
          password: req.body.password,
        }),
      });

      await saveSess({
        user: {
          token: "scnajcbs",
        },
      });
      return res.status(200).json({ status: "LOGGED" });
    } catch (e) {
      return res.status(400).json({
        message: e,
      });
    }
  },
  sessionOptions
);
