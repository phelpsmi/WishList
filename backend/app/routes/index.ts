import { userRouter } from "./user.routes";
import { wishRouter } from "./wish.routes";
import {Application, NextFunction, Response} from "express"
import { authRouter } from "./auth.routes";
import { AuthJwt } from "../middleware/authJwt";
import { familyRouter } from "./family.routes";

export function addRoutes(app: Application) {
    app.use((_, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.use('/api/wishes', [AuthJwt.verifyToken], wishRouter);
    app.use('/api/users', [AuthJwt.verifyToken], userRouter);
    app.use('/api/families', [AuthJwt.verifyToken], familyRouter);
    app.use('/api/auth', authRouter);
}