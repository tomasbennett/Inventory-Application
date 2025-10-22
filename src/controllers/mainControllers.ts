import { Request, Response } from "express-serve-static-core";
import { ICategoryType, IItemType } from "../dtos/ICategoriesType";
import { deleteCategoryByID, deleteItemByID, getAllCategories, getAllItems, getAllItemsByCategory } from "../db/queries";



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


export async function itemsListPageGETParams(req: Request<{ id: string }>, res: Response) {
    const idParam = req.params.id;
    const idNumber = Number(idParam);

    if (isNaN(idNumber)) {
        throw new Error("id passed in was not a valid number!!!");

    }

    const items: IItemType[] | null = await getAllItemsByCategory(idNumber);

    if (items === null) {
        throw new Error("the items returned null meaning error in fetching or error in return type!!!")
    }

    return res.render("itemsDisplay", { items });


}


export async function allItemsListPageGET(req: Request, res: Response) {

    const items: IItemType[] | null = await getAllItems();

    if (items === null) {
        throw new Error("the items returned null meaning error in fetching or error in return type!!!")
    }

    return res.render("itemsDisplay", { items });

}



export async function deleteItem(req: Request<{ id: string }>, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(404).json({ error: "id unable to be converted to a number!!!" });

    try {
        const result: boolean = await deleteItemByID(id);
        if (result) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: "Item was not found!!!" });

    } catch {
        res.status(500).json({ error: "Server error" });
    }




}



export async function deleteCategory(req: Request<{ id: string }>, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    if (isNaN(id)) return res.status(404).json({ error: "id unable to be converted to a number!!!" });

    try {
        const result: boolean = await deleteCategoryByID(id);
        if (result) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: "Category was not found!!!" });

    } catch {
        res.status(500).json({ error: "Server error" });
    }




}
