import { Request, Response } from "express-serve-static-core";
import { ICategoryType } from "../dtos/ICategoriesType";


export function homePageGET(req: Request, res: Response): void {
    res.render("index");
}

export function categoriesListPageGET(req: Request, res: Response): void {
    const categories: ICategoryType[] = [
        {
            id: 1,
            name: "FPS"
        },
        {
            id: 2,
            name: "RPG"
        },
        {
            id: 3,
            name: "MOBA"
        }
    ]

    res.render("categoriesSelection", { categories })
}