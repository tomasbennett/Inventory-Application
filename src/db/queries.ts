import { CategorySchema, ICategoryType, IItemType, ItemSchema } from "../dtos/ICategoriesType";
import { projCategoryTableName, projItemTableName, projJunctionTableName, projSchemaName } from "./dbConstants";
import { pool } from "./pool";

import { z } from "zod";


export async function getAllCategories(): Promise<ICategoryType[] | null> {
    const allCategoriesResult = await pool.query<ICategoryType>(`
        SELECT * FROM ${projSchemaName}.${projCategoryTableName};
    `);

    const allCategories = allCategoriesResult.rows;

    const result = z.array(CategorySchema).safeParse(allCategories);

    if (result.success) {
        console.log("success, the data is a match to ICategoryTypeArr");
        return result.data;
    }

    console.log(result.error);
    return null;
}

export async function getAllItems(): Promise<IItemType[] | null> {
    const allItemsResult = await pool.query<IItemType>(`
        SELECT * FROM ${projSchemaName}.${projItemTableName};
    `);

    const allItems = allItemsResult.rows;

    const result = z.array(ItemSchema).safeParse(allItems);

    if (result.success) {
        return result.data;
    }

    console.log(result.error);
    return null;
}



export async function getAllItemsByCategory(categoryId: number): Promise<IItemType[] | null> {
    
    try {
        const allItemIdsResult = await pool.query<{item_id: number}>(`
            SELECT item_id FROM ${projSchemaName}.${projJunctionTableName}
            WHERE category_id = $1;
        `, [categoryId]);
    
        const allItemIds = allItemIdsResult.rows;

        if (allItemIds.length === 0) return [];

        console.log("THERE WAS AN ARRAY RETURNED!!!", allItemIds);

        const safeIdsString: string = allItemIds.map((_, i) => {
            return `$${i + 1}`
        }).join(", ");

        console.log(safeIdsString);

        const items = await pool.query(`
            SELECT * FROM ${projSchemaName}.${projItemTableName}
            WHERE id IN (${safeIdsString});
        `, allItemIds.map(i => i.item_id));


    
        const result = z.array(ItemSchema).safeParse(items.rows);
    
        if (result.success) {
            console.log("success, the data is a match to IItemTypeArr");
            return result.data;
        }
    
        console.log(result.error);
        return null;

    } catch {
        console.log("try catch block failed when requesting data!!!")
        return null;

    }
    
}



export async function deleteCategoryByID(id: number): Promise<boolean> {

    const query: string = `
        DELETE FROM ${projSchemaName}.${projCategoryTableName}
        WHERE id = $1
    `

    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
        return false;
    }

    return true;

}

export async function deleteItemByID(id: number): Promise<boolean> {

    const query: string = `
        DELETE FROM ${projSchemaName}.${projItemTableName}
        WHERE id = $1
    `

    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
        return false;
    }

    return true;

}