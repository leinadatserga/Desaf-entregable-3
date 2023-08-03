import express from 'express';
import ProductManager from './ProductManager.js';

const app = express ();
const PORT = 8080;
const productManager = new ProductManager ();
app.use ( express.urlencoded ({ extended:true }));
const products = await productManager.downLoadDataBase ();
app.get ( "/products/:pid", async ( req, res ) => {
    const product =  await products.find ( object => object.id === parseInt ( req.params.pid ));
    product ? res.send ( product ) : res.send ( "Product not found" );
});
app.get ( "/products", async ( req, res ) => {
    const {limit} = req.query;
    if ( !limit ) {
    res.send ( products );
    } else {
    const productSearch = await products.slice ( 0, parseInt ( limit ) );
    res.send ( productSearch );
    }
});
app.get ( "/products", async ( req, res ) => {
    res.send ( products );
});
app.get ( "*", async ( req, res ) => {
    res.send ( "Error 404 - Sorry, cant find that" );
});
app.listen ( PORT, () => {
    console.log ( `Server on port ${ PORT }` )
});