import passport = require('passport');
import {ExtractJwt, VerifiedCallback , Strategy} from 'passport-jwt';
import {User} from '../models';
import { UserModel } from '../models/userModel';

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const JWTVerify = async (jwtPayload:UserModel, done:VerifiedCallback) => {
  try {
      console.log('어디냐?',jwtPayload)
      const userid:number = jwtPayload.userId as number;
    const user = await User.findOne({
      where: { userId: userid },
    });
    
    if (user) {
      done(null, user);
      return;
    } else {
      done(null, false, { msg: '존재하지 않는 사용자 입니다.' });
    }
    done(null, false, { msg: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};
function jwt() {
  passport.use('jwt', new Strategy(JWTConfig, JWTVerify));
}

module.exports = {JWTConfig, JWTVerify, jwt}