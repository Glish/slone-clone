import { ExtractJwt, Strategy } from "passport-jwt";
import CONFIG from "../config/config";
import models from "../models";
import { to } from "../utils";

export default passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwtEncryption;

  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      const [err, user] = await to(models.User.findByPk(jwtPayload.user_id));

      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user.toWeb());
      }

      return done(null, false);
    })
  );
};
