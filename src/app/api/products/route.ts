import {db} from "@/lib/db";
import {products as productsTable, category as categoriesTable} from "@/db/schema";
import {ProductsFilter} from "@/lib/api.utils";
import {and, eq, gte, like, lte, SQL} from "drizzle-orm";

export async function POST(request: Request) {
    const {query, category, to, from} = await request.json() as ProductsFilter;

    const conditions: SQL<any>[] = [];

    if (query) {
        conditions.push(like(productsTable.name, `%${query}%`));
    }

    if (category && category !== "all") {
        const selectedCategory = await db
                                        .select()
                                        .from(categoriesTable)
                                        .where(eq(categoriesTable.id, Number(category)))
                                        .limit(1);
        if (selectedCategory.length > 0) {
            conditions.push(eq(productsTable.category, selectedCategory[0].id));
        }
    }

    if (from) {
        conditions.push(gte(productsTable.price, Number(from)));
    }

    if (to) {
        conditions.push(lte(productsTable.price, Number(to)));
    }

    const products = await db.select().from(productsTable).where(and(...conditions));

    return Response.json({
        products: products,
    });
}
