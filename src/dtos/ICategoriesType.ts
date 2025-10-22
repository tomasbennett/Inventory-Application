import { z } from "zod";


// export interface ICategoryType {
//     id: number,
//     name: string,
// }


export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
});

export type ICategoryType = z.infer<typeof CategorySchema>;



export const ItemSchema = z.object({
    id: z.number(),
    name: z.string()
});


export type IItemType = z.infer<typeof ItemSchema>;