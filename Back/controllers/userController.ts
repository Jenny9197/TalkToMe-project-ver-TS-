import { Request, Response } from 'express';

import { User } from '../models';


class UserFunc {
    public googleCallback = async (req: Request, res: Response) => {
        try {
            const user : string;
            const userId : string;
            const accessToken = Jwt.sign({ userId }), process.env.SECRET_KEY, { expiresIn: '1d' });
            const message : string = 'login success';
            res.redirect(`http://localhost:3000/sociallogin/accessToken=${accessToken}`);
        } catch (error) {
            console.log(error);
            const message : string = 'undefined problem, please try again';
            res.status(500).send({ message });
        }
    }
    public me = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            const nickname = res.locals.nick;
            if(!userId){
                res.status(401).json({ result: 'fail', msg: 'login required'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg = 'undefined problem, please try again'});
        }
    }
}