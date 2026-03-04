const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../src/pages/LoginPage.po.js');
const { DashboardPage } = require('../src/pages/DashboardPage.po.js');
const { CartPage } = require('../src/pages/CartPage.po.js');
const { CheckoutPage } = require('../src/pages/CheckoutPage.po.js');
const { OrdersPage } = require('../src/pages/OrdersPage.po.js');
const { ConfirmationPage } = require('../src/pages/ConfirmationPage.po.js');
const testData = JSON.parse(JSON.stringify(require("../utils/placeOrderData.json")));

test.only('Ecomm App E2E Test', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Page Objects
    const loginPage = new LoginPage(page);
    const dashboardpage = new DashboardPage(page);
    const cartpage = new CartPage(page);
    const checkoutpage = new CheckoutPage(page);
    const confirmationpage = new ConfirmationPage(page);
    const orderspage = new OrdersPage(page);
    

    await loginPage.landOnLogin();
    await loginPage.validLogin(testData.useremail, testData.password);
    
    await dashboardpage.displayProducts();
    await dashboardpage.addToCart(testData.productName);
    await dashboardpage.navToCart();

    await cartpage.verifyItemCheckout();
    
    await checkoutpage.placeOrder(testData.country);

    const orderID = await confirmationpage.verifyOrderConfirmation();
    await confirmationpage.navToOrders();
    
    await orderspage.validateOrders(orderID, testData.productName);
});