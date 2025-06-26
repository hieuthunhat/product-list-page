import yup from 'yup';

export const productInputMiddleware = async (ctx, next) => {
    try {
        const productData = ctx.request.body;
        
        // Schema cho thêm sản phẩm mới (POST) - BE tự tạo id và createdAt
        const createSchema = yup.object().shape({
            name: yup.string().required('Product name is required'),
            price: yup.number().positive('Price must be positive').required('Price is required'),
            product: yup.string().required('Product category is required'),
            description: yup.string().optional(),
            color: yup.string().optional(),
            image: yup.string().url('Image must be a valid URL').optional()
        });

        // Schema cho cập nhật sản phẩm (PUT) - id có thể có trong body, createdAt giữ nguyên
        const updateSchema = yup.object().shape({
            name: yup.string().required('Product name is required'),
            price: yup.number().positive('Price must be positive').required('Price is required'),
            product: yup.string().required('Product category is required'),
            description: yup.string().optional(),
            color: yup.string().optional(),
            image: yup.string().url('Image must be a valid URL').optional()
        });

        // Chọn schema dựa trên HTTP method
        const schema = ctx.method === 'POST' ? createSchema : updateSchema;
        
        await schema.validate(productData, { abortEarly: false });
        await next();
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'Validation failed',
            errors: error.errors || [error.message],
            errorName: error.name
        }
    }
}