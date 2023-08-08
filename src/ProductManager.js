import fs from 'fs';


class ProductManager {
    constructor () {
        this.path = "./src/productsTxt.txt"
    }
    initDataBase () {
        const existDataBase = fs.existsSync ( this.path );
        if ( existDataBase ) {
            return existDataBase;
        } else {
            let createDataBase = fs.writeFileSync ( this.path, '[]');
            return existDataBase;
        } 
    }
    deleteDataBase () {
        if ( this.initDataBase () ) {
            fs.unlinkSync ( this.path );
        } else {
            console.log ( "Error! database Not found" );
        }
    }
    downLoadDataBase () {
        this.initDataBase ();
        if ( this.initDataBase () ) {
            let txtDatabase = JSON.parse ( fs.readFileSync ( this.path, 'utf-8' ));
            return txtDatabase;
        } else {
            return console.log ( "Error! database Not found" );
        }
    }
    writeDataBase ( product ) {
        if ( this.initDataBase () ) {
            const jsonProduct = fs.writeFileSync ( this.path, JSON.stringify (product) );
        } else {
            console.log ( "Error, cannot write" );
        }
    }
    getProduct () {
        return this.downLoadDataBase ();
    }
    validateProducts ( product ) {
        const fields = Object.values ( product );
        const invalidFields = fields.find ( field => field === "" );
        if ( invalidFields != "" && fields.length === 7 && fields[6] > 0 ) {
            return true;
        }
        return false;
    }
    addProduct ( itemDetail ) {
        const productsTxt = this.downLoadDataBase ();
        let compareCod = productsTxt.find ((cod) => cod.code == itemDetail.code );
        if ( compareCod ) {
            return console.log ( "Error! product already exists" );
        }
        if ( this.validateProducts ( itemDetail )) {
            productsTxt.push ( itemDetail );
            this.writeDataBase ( productsTxt );
            } else {
                console.log ( "Review the data, all fields are required" );
            }               
    }
    getProductById ( id ) {
        const productsTxt = this.downLoadDataBase ();
        const search = productsTxt.find ( object => object.id === id );
        return search ? search :  "Not found" ;
    }
    updateProduct ( id, modifyProduct ) {
        const productsTxt = this.downLoadDataBase ();
        const productIndex = productsTxt.findIndex ( object => object.id === id );
        if ( productIndex != -1 ) {
            productsTxt [ productIndex ].title = modifyProduct.title ? modifyProduct.title : productsTxt [ productIndex ].title;
            productsTxt [ productIndex ].description = modifyProduct.description ? modifyProduct.description : productsTxt [ productIndex ].description;
            productsTxt [ productIndex ].price = modifyProduct.price ? modifyProduct.price : productsTxt [ productIndex ].price;
            productsTxt [ productIndex ].thumbnail = modifyProduct.thumbnail ? modifyProduct.thumbnail : productsTxt [ productIndex ].thumbnail;
            productsTxt [ productIndex ].code = modifyProduct.code ? modifyProduct.code : productsTxt [ productIndex ].code;
            productsTxt [ productIndex ].stock = modifyProduct.stock ? modifyProduct.stock : productsTxt [ productIndex ].stock;
            this.writeDataBase ( productsTxt );
        } else {
            console.log ( "Error! product to update Not found" );
        }
    }
    deleteProduct ( id ) {
        const productsTxt = this.downLoadDataBase ();
        const productsToSave = productsTxt.filter ( object => object.id != id );
        this.writeDataBase ( productsToSave );
    }
}

class Product {
    constructor ( title, description, price, thumbnail, code, stock ) {
        this.id = Product.autoId ()
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
    static autoId () {
        this.unicId ? this.unicId ++ : this.unicId = 1;
        return this.unicId;
    }
}


export default ProductManager;