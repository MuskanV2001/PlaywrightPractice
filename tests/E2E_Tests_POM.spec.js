const {customtest} = require('../utils/test-base.js')
const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../src/pages/LoginPage.po.js');
const { DashboardPage } = require('../src/pages/DashboardPage.po.js');
const { CartPage } = require('../src/pages/CartPage.po.js');
const { CheckoutPage } = require('../src/pages/CheckoutPage.po.js');
const { OrdersPage } = require('../src/pages/OrdersPage.po.js');
const { ConfirmationPage } = require('../src/pages/ConfirmationPage.po.js');
const testData = JSON.parse(JSON.stringify(require("../utils/placeOrderData.json")));

for(const orderData of testData)
{
    test(`Ecomm App E2E Test - ${orderData.useremail}`, async({browser})=>{

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
        await loginPage.validLogin(orderData.useremail, orderData.password);
        
        await dashboardpage.displayProducts();
        await dashboardpage.addToCart(orderData.productName);
        await dashboardpage.navToCart();

        await cartpage.verifyItemCheckout();
        
        await checkoutpage.placeOrder(orderData.country);

        const orderID = await confirmationpage.verifyOrderConfirmation();
        await confirmationpage.navToOrders();
        
        await orderspage.validateOrders(orderID, orderData.productName);

        await page.close();
    });
}

customtest.only(`Ecomm App E2E Test with Customization`, async({browser, testDataForOrder})=>{

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
        await loginPage.validLogin(testDataForOrder.useremail, testDataForOrder.password);
        
        await dashboardpage.displayProducts();
        await dashboardpage.addToCart(testDataForOrder.productName);
        await dashboardpage.navToCart();

        await cartpage.verifyItemCheckout();
});