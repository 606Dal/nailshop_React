import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/about', 'routes/about.tsx'),
    route('/products', 'layout/productLayout.tsx', [
        route("list", 'routes/products/listPage.tsx'),
        route("add", 'routes/products/addPage.tsx'),
        route(":pno", 'routes/products/readPage.tsx'),
        route("modify/:pno", 'routes/products/modifyPage.tsx'),
    ]),
] satisfies RouteConfig;
