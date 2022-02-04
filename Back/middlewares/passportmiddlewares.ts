import { Request, Response, NextFunction } from 'express';
import passport from "passport";

export function logInOnly(req:Request, res:Response, next:NextFunction){
    try {
        console.log("어디가 문제야");
        passport.authenticate("jwt", (passportError, user, info) => {
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