import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, 'products.json');

const readData = async () => {
    try {
        const fileData = await fs.readFile(dbFile, {encoding: 'utf-8'});
        return JSON.parse(fileData);
    } catch (error) {
        throw new Error("Error when reading DB file! " + error);
    }
}

const writeData = async (data) => {
    try {
        await fs.writeFile(dbFile, JSON.stringify(data, null, 2), {encoding: 'utf-8'});
    } catch (error) {
        throw new Error("Error when writing DB file! " + error);
    }
}

export {writeData, readData}