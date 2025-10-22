import { CategorySchema, ICategoryType } from "../dtos/ICategoriesType";
import { projCategoryTableName, projSchemaName } from "./dbConstants";
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