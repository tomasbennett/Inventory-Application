import { Request, Response } from "express-serve-static-core";
import { ICategoryType } from "../dtos/ICategoriesType";
import { getAllCategories } from "../db/queries";


export function homePageGET(req: Request, res: Response): void {
    res.render("index");
}

export async function categoriesListPageGET(req: Request, res: Response) {
    const categories: ICategoryType[] | null = await getAllCategories();

    if (categories !== null) {
        return res.render("categoriesSelection", { categories });

    }

    throw new Error("The data wasn't a match to ICategoryType!!!");

}


export function itemsListPageGETParams(req: Request<{ id: string }>, res: Response): void {
    const idParam = req.params.id;
    const idNumber = Number(idParam);

    if (!isNaN(idNumber)) {
        


    }


}