import express from 'express';
import ProductManager from './ProductManager.js';

const app = express ();
const PORT = 8080;
const productManager = new ProductManager ();
app.use ( express.urlencoded ({ extended:true }));
app.get ( "/products/:pid", async ( req, res ) => {
    const product = productManager.getProductById ( parseInt ( req.params.pid ));
    res.json ( product );
});
app.get ( "/products", async ( req, res ) => {
    const {limit} = req.query;
    const products = productManager.downLoadDataBase ();
    if ( !limit ) {
    res.json ( products );
    } else {
    const productSearch = products.slice ( 0, parseInt ( limit ) );
    res.json ( productSearch );
    }
});
app.get ( "*", async ( req, res ) => {
    res.send ( "Error 404 - Sorry, cant find that" );
});
app.listen ( PORT, () => {
    console.log ( `Server on port ${ PORT }` )
});