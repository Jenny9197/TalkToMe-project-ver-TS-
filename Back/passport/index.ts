import passport from "passport";
import *as google from './googleStrategy'; //전체적으로 구글로 치환한다
import { User } from '../models';
import *as jwt from './jwtStrategy'; // 전체적으로 jwt로 치환한다



module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user, '여기어때?')
    done(null, user.userId);
    console.log(user.userId);
    
  });

  passport.deserializeUser((id:number, done) => {
    console.log(id, '넌 뭐니?')
    User.findOne({ where: { userId : id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  google;
  jwt;
};
