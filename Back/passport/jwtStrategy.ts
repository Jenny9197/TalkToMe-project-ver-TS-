import passport = require('passport');
import passportjwt from 'passport-jwt';
import {User} from '../models';
import { UserModel } from '../models/userModel';

const JWTConfig = {
  jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const JWTVerify = async (jwtPayload:UserModel, done:passportjwt.VerifiedCallback) => {
  try {
      console.log('where?',jwtPayload)
      const userid:number = jwtPayload.userId as number;
    const user = await User.findOne({
      where: { userId: userid },
    });
    
    if (user) {
      done(null, user);
      return;
    } else {
      done(null, false, { msg: 'Not found as existed user' });
    }
    done(null, false, { msg: 'Incorrect verified information' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};
function jwt() {
  passport.use('jwt', new passportjwt.Strategy(JWTConfig, JWTVerify));
}

module.exports = {JWTConfig, JWTVerify, jwt}