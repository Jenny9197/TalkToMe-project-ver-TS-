import express,{Request, Response, NextFunction} from "express";

const app = express();

app.route("/").get((req:Request, res:Response)=>{
    res.status(200).send({test:"mytest"})
})
app.use((req:Request, res:Response, next:NextFunction)=>{
    const error =  new Error(`${req.method} ${req.url} 라우터 없음..!`);
    next(error)
})
app.use((err:Error, req:Request, res: Response, next:NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.send(err.message);
});


app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})