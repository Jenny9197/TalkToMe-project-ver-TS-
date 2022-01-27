"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.route("/").get((req, res) => {
    res.status(200).send({ test: "mytest" });
});
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터 없음..!`);
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.send(err.message);
});
app.listen(3000, () => {
    console.log("http://localhost:3000");
});
//# sourceMappingURL=app.js.map