import { Request, Response } from 'express';
import Jwt  from 'jsonwebtoken';
import { User } from '../models/userModel';


class UserFunc {
    public googleCallback = async (req: Request, res: Response) => {
        try {
            const user = req.user!; 
            const userId = user.userId;
            const token = Jwt.sign({ userId }, process.env.SECRET_KEY || "test", { expiresIn: '1d' });
            const message : string = 'login success';
            res.redirect(`http://localhost:3000/sociallogin/accessToken=${token}?message=${message}`);
        } catch (error) {
            console.log(error);
            const message : string = 'undefined problem, please try again';
            res.status(500).send({ message });
        }
    }
    public me = async (req: Request, res: Response) => {
        try {
            const userId = res.locals.user;
            if(!userId){
                res.status(401).json({ result: 'fail', msg: 'login required'});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg : 'undefined problem, please try again'});
        }
    }
}

module.exports = new UserFunc();