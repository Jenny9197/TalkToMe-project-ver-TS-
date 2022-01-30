import { Request, Response, NextFunction } from 'express';

export function isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.locals.user = userId;
        next();
    } else {
        console.log(req);
        return res.status(403).send('로그인이 필요합니다.');
    }
};

export function isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        console.log('!');
        next();
    } else {
        const message : string = encodeURIComponent('로그인한 상태입니다.');
        return res.redirect(`/?error=${message}`);
    }
};