import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { IronSessionData } from "iron-session";
import { sessionOptions } from "../../lib/session";
export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.body.method === "logout") {
        req.session.destroy();
        return res.status(200).json({
          message: "logout",
        });
      }

      const saveSess = async (r: IronSessionData) => {
        req.session.user = {
          token: r.user.token,
        };
        await req.session.save();
      };

      const resx = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: req.body.email,
          password: req.body.password,
        }),
      });

      const result = await resx.json()
      console.log(result)

      await saveSess({
        user: {
          token: result.token,
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