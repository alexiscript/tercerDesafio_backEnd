import { promises as fs } from 'fs';


export default class ProductManager {
    constructor() {
        this.patch = './productos.txt';
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct);


        await fs.writeFile(this.patch, JSON.stringify(this.products, null, '\t'));


    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, 'utf-8')
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find(product => product.id == id)) {
            console.log("No se encontro el producto");
        } else {
            console.log(respuesta3.find(product => product.id == id));
        }

    }
    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(product => product.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter, null, '\t'));
        console.log("Producto eliminado");

    }
    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductById(id);
        let productsOld = await this.readProducts();
        let productsModif = [{ ...producto, id }, ...productsOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif, null, '\t'));

    }

}

//const productos = new ProductManager();

// productos.addProduct("titulo1", "descripcion1", 100, "imagen1", "abc1", 10);
// productos.addProduct("titulo2", "descripcion2", 100, "imagen2", "abc2 ", 10);
// productos.addProduct("titulo3", "descripcion3", 100, "imagen3", "abc3 ", 10);
// productos.addProduct("titulo4", "descripcion4", 100, "imagen4", "abc4 ", 10);
// productos.addProduct("titulo5", "descripcion5", 100, "imagen5", "abc5 ", 10);
// productos.addProduct("titulo6", "descripcion6", 100, "imagen6", "abc6 ", 10);
// productos.addProduct("titulo7", "descripcion7", 100, "imagen7", "abc7 ", 10);
// productos.addProduct("titulo8", "descripcion8", 100, "imagen8", "abc8 ", 10);
// productos.addProduct("titulo9", "descripcion9", 100, "imagen9", "abc9 ", 10);
// productos.addProduct("titulo10", "descripcion10", 100, "imagen10", "abc10 ", 10);




//productos.getProducts();

//productos.getProductsById(3);

//productos.deleteProductById(4);

// productos.updateProducts({
//     title: "titulo3",
//     description: "descripcion3",
//     price: 4500,
//     imagen: "imagen3",
//     code: "abc1",
//     stock: 10,
//     id: 3
// });