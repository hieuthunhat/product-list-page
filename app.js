// app.js (ESM)
import Koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import { apiRouter, homeRouter } from './routes/routes.js';
import views from 'koa-views';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);        

const app = new Koa();

app.use(koaBody());

app.use(serve(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

app.use(homeRouter.routes());
app.use(homeRouter.allowedMethods());

app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
