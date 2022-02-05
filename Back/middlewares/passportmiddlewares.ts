import { Request, Response, NextFunction } from 'express';
import passport from "passport";

export function logInOnly(req:Request, res:Response, next:NextFunction){
    try {
        console.log("어디가 문제야");
<<<<<<< HEAD
        passport.authenticate("jwt", (passportError:any, user:any, nickname:any, info:any) => {
=======
        passport.authenticate("jwt", (passportError:any, user:any, info:any) => {
>>>>>>> a71d3c6b2f2357f0067ceaa3f291707cf2dab836
            if (passportError) {
                console.error("passportError:", passportError);
                return res.send({ message: passportError });
            }
            if(!user) {
                return res.status(401).send({ message: info.message });
            }
            res.locals.user = user;
            res.locals.nick = nickname;
            next();
        }) (req, res, next);
    } catch (error) {
        console.error(error);
        return res.send({ message: error });
    }
};