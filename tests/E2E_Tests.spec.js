const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../src/pages/LoginPage.po.js');
const { DashboardPage } = require('../src/pages/DashboardPage.po.js');
const { CartPage } = require('../src/pages/CartPage.po.js');
const { CheckoutPage } = require('../src/pages/CheckoutPage.po.js');
const { OrdersPage } = require('../src/pages/OrdersPage.po.js');
const { ConfirmationPage } = require('../src/pages/ConfirmationPage.po.js');

test.only('Ecomm App E2E Test', async({browser})=>{

    const useremail = 'muskanv01lko@gmail.com';
    const password = 'Mv@12345678';
    const item = "iphone 13 pro";
    const country = "ind";

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
    await loginPage.validLogin(useremail, password);
    
    await dashboardpage.displayProducts();
    await dashboardpage.addToCart(item);
    await dashboardpage.navToCart();

    await cartpage.verifyItemCheckout();
    
    await checkoutpage.placeOrder(country);

    const orderID = await confirmationpage.verifyOrderConfirmation();
    await confirmationpage.navToOrders();
    
    await orderspage.validateOrders(orderID, item);
});