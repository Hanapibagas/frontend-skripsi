import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return res.status(200).json(req.session.user);
    } catch (e) {
      return res.status(400).json({
        message: e,
      });
    }
  },
  sessionOptions
);