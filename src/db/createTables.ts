import { Client } from "pg";

const connectionString: string = process.argv[2];

if (!connectionString) {
    console.error("THERE WAS NO CONNECTION STRING!!!");
    process.exit(1);
}


const schemaName: string = "itemsCategoriesSchema";

const buildTablesQuery: string = `
    CREATE SCHEMA IF NOT EXISTS ${schemaName};

    CREATE TABLE IF NOT EXISTS ${schemaName}.items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${schemaName}.categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS ${schemaName}.items_categories_junction (
        item_id INT REFERENCES ${schemaName}.items(id) ON DELETE CASCADE,
        category_id INT REFERENCES ${schemaName}.categories(id) ON DELETE CASCADE,
        PRIMARY KEY (item_id, category_id)
    );

    INSERT INTO ${schemaName}.items (name) VALUES 
    ('Overwatch'), ('Call of Duty'), ('Borderlands 2'), ('League of Legends');

    INSERT INTO ${schemaName}.categories (name) VALUES 
    ('FPS'), ('RPG'), ('MOBA');

    INSERT INTO ${schemaName}.items_categories_junction (item_id, category_id) VALUES 
    (1, 1),
    (1, 3),
    (2, 1),
    (3, 1),
    (3, 2),
    (4, 3);
`


async function main() {
    const client = new Client({
        connectionString: connectionString,
        ssl: connectionString.includes("aivencloud")
            ? { rejectUnauthorized: false }
            : false
    });

    try {

        await client.connect();

        await client.query(buildTablesQuery);

    } catch (err) {

        console.error(err);

    } finally {
        await client.end();
    }

}

main();