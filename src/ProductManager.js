import { promises as fs } from 'fs';


class ProductManager {
    constructor () {
        this.path = "./src/dataBase.txt"
    }
    async downLoadDataBase () {
        const txtDatabase = JSON.parse ( await fs.readFile ( this.path, 'utf-8' ));
        return txtDatabase;
    }
}

export default ProductManager;
