const fs  = require ("fs");

class Api {
    constructor (file){
        this.file = file;
    }

    //* obtener todos
    async getAll(){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const products = JSON.parse(data);
            return products;
        } catch (e){
            console.log(e);
        }
    }

    //* obtener por ID
    async getById(id){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const products = JSON.parse(data);
            const product = products.find((product) => product.id == id);
            if (product){
                return product;
            } else {
                return "Producto no encontrado";
            }
        } catch (e){
            console.log(e);
        }
    }

    //* crear producto
    async save(name, price, description, codigo, thumbnail, stock) {
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const products = JSON.parse(data);
            const id = products.length + 1;
            const timestamp = new Date().toLocaleString();
            const newProduct = {
                id:`${id}`,
                timestamp,
                name,
                description,
                codigo,
                thumbnail,
                price,
                stock
            }
            products.push(newProduct);
            const productsString = JSON.stringify(products);
            await fs.promises.writeFile(this.file, productsString);
            return newProduct.id;
        } catch (e) {
            console.log(e);
        }
    }

    //* actualizar por ID
    async updateById (id, name, price, description, codigo, thumbnail, stock){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const products = JSON.parse(data);
            let product = products.find((product) => product.id === id);
            const timestamp = new Date().toLocaleString();
            const newProduct = {
                id,
                timestamp,
                name,
                description,
                codigo,
                thumbnail,
                price,
                stock
            }
            if (!product){
                product = null;
            } else {
                const filterProduct = products.filter ((product) => product.id != id);
                filterProduct.push(newProduct)
                const stringProduct = JSON.stringify(filterProduct);
                await fs.promises.writeFile(this.file, stringProduct);
            }
            return product;
        } catch (e) {
            console.log(e);
        }
    }

    //* borrar por ID
    async deleteById(id){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const products = JSON.parse(data);
            let found = products.find((product) => (product.id) === id)
            if (!found) {
                found = null;
            } else {
                const filterProduct = products.filter ((product) => product.id != id);
                const stringProduct = JSON.stringify(filterProduct);
                await fs.promises.writeFile(this.file, stringProduct);
            }
            return found;
        } catch (e){
            console.log(e);
        }
    }
}


module.exports = Api;