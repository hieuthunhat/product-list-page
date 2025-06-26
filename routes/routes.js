import Router from 'koa-router';
import { productInputMiddleware } from '../middleware/productInputMiddleware.js';
import productHandlers from '../handlers/products/productsHandlers.js';

const router = new Router({
  prefix: '/api'
});

// API routes
router.get('/products', productHandlers.getManyProducts);
router.get('/products/:id', productHandlers.getOneProduct);
router.post('/products', productInputMiddleware, productHandlers.addProduct);
router.put('/products/:id', productInputMiddleware, productHandlers.updateProduct);
router.delete('/products/:id', productHandlers.deleteProduct);
router.get('/', productHandlers.renderProductsPage);

// Router cho trang chủ (không có prefix)
const homeRouter = new Router();
homeRouter.get('/', productHandlers.renderProductsPage);

export { router as apiRouter, homeRouter };
