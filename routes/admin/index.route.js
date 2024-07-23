const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const rolesRoute = require("./role.route");
const accountsRoute = require("./account.route");
const authRoute = require("./auth.route");
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;

    app.use(
        `${path}/dashboard`,
        authMiddleware.requiredAuth,
        dashboardRoute
    );

    app.use(
        `${path}/products`,
        authMiddleware.requiredAuth,
        productRoute
    );

    app.use(
        `${path}/products-category`,
        authMiddleware.requiredAuth,
        productCategoryRoute
    );

    app.use(
        `${path}/roles`,
        authMiddleware.requiredAuth,
        rolesRoute
    );

    app.use(
        `${path}/accounts`,
        authMiddleware.requiredAuth,
        accountsRoute
    );
    
    app.use(`${path}/auth`, authRoute);

}