import express from 'express';
import ProductManager from './components/ProductManager.js';

const app = express(); // ejecutamos express
app.use(express.urlencoded({ extended: true })); // para que pueda leer los formularios

const productos = new ProductManager(); // instanciamos la clase ProductManager
const readProducts = productos.readProducts(); // leemos los productos

app.get('/products', async (req, res) => {

    let limit= parseInt(req.query.limit); // si hay un query limit, lo parseamos a int
    
    if (!limit) return res.send(await readProducts); // si no hay query limit, devolvemos todos los productos

    let allProducts = await readProducts;

    let productLimit = allProducts.slice(0, limit);


    
    res.send(productLimit);
}) // ruta raiz

app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id == id);
    if (!productById) return res.send({ error: 'producto no encontrado' }); // si no encuentra el producto, devuelve un error
    res.send(productById); // si lo encuentra, devuelve el producto
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
}) // levantamos el servidor

server.on('error', error => console.log(`Error en servidor ${error}`)) // en caso de error, avisar

