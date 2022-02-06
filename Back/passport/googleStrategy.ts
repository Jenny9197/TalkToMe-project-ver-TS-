import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { User } from "../models";

function getRandomInt(min: number, max: number) {
  //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = () => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || "test",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "test",
        callbackURL: "http://ozam.shop/user/google/callback",
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            console.log(profile.name);
            const newUser = await User.create({
              email: profile._json && profile._json.email,
              nickname: "아무개" + getRandomInt(1, 10000),
              // nickname: profile.displayName,
              snsId: profile.id,
              provider: "google",
            });
            console.log(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
