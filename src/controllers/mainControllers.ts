import { Request, Response } from "express-serve-static-core";


export function homePageGET(req: Request, res: Response): void {
    res.render("index");
}