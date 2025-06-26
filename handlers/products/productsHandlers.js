import { deleteOne, updateOne, addOne, getMany, getOne } from "../../database/productRepository.js";

const addProduct = async (ctx) => {
    try {
        const data = ctx.request.body;
        const product = await addOne(data);
        if (product) {
            return ctx.body = {
                data: product
            }
        } else {
            ctx.status = 404;
            ctx.body = { success: false, message: "Fail to create a product" };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

const getManyProducts = async (ctx) => {
    try {
        const { limit, sort } = ctx.query;
        const products = await getMany({ limit, sort });
        if (products) {
            return ctx.body = {
                data: products
            }
        } else {
            ctx.status = 404;
            ctx.body = { success: false, message: "No products found" };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

const getOneProduct = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { fields } = ctx.query;
        const currentProduct = await getOne(Number(id));
        if (!currentProduct) {
            ctx.status = 404;
            ctx.body = { success: false, message: "Product not found" };
            return;
        }

        if (fields) {
            const selectedFields = fields.split(',').map(field => field.trim());
            const filteredProduct = selectedFields.reduce((result, key) => {
                if (currentProduct.hasOwnProperty(key)) {
                    result[key] = currentProduct[key];
                }
                return result;
            }, {});

            ctx.body = { data: filteredProduct };
        } else {
            ctx.body = { data: currentProduct };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

const updateProduct = async (ctx) => {
    try {
        const { id } = ctx.params;
        const data = ctx.request.body;
        const updated = await updateOne(Number(id), data);
        if (updated) {
            ctx.body = { data: updated };
        } else {
            ctx.status = 404;
            ctx.body = { success: false, message: 'Product not found' };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { success: false, error: e.message };
    }
}

const deleteProduct = async (ctx) => {
    try {
        const { id } = ctx.params;
        const product = await deleteOne(Number(id));
        if (product) {
            ctx.body = { data: product };
        } else {
            ctx.status = 404;
            ctx.body = { success: false, message: 'Product not found' };
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = { success: false, error: e.message };
    }
}

const renderProductsPage = async (ctx) => {
    const products = await getMany({});
    await ctx.render('index', { products });
};

export default {
  getManyProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  renderProductsPage
};
