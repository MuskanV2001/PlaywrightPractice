const {test, expect} = require('@playwright/test');

test('Ecomm App E2E Test', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill('muskanv01lko@gmail.com');
    await page.locator("#userPassword").fill('Mv@12345678');
    await page.locator("#login").click();

    await page.locator(".card-body b").first().waitFor();

    const productNames = await page.locator(".card-body b").allTextContents();
    console.log("Available Products: " + productNames);

    //Select iphone 13 pro item
    const item = "iphone 13 pro";
    const products = page.locator(".card-body");
    const count = await products.count();
    for(let i=0;i<count;++i){
        if(await products.nth(i).locator('b').textContent()===item){
            console.log('Item available');
            await products.nth(i).locator('text="Add To Cart"').click();
            break;
        }
    }

    //Check cart items
    await page.locator('[routerlink="/dashboard/cart"]').click();

    await page.locator('.cartWrap').first().waitFor();

    const cartItems = page.locator('.cartWrap');
    const n = await cartItems.count();
    for(let i=0;i<n;++i){
        if(await cartItems.nth(i).locator("h3:has-text('iphone 13 pro')").isVisible()){
            console.log('Item added to cart');
            await page.locator('text="Checkout"').click();
            console.log('Clicked Checkout');
            break;
        }
    }
    
    //Enter details on Checkout Page
    await page.getByPlaceholder('Select Country').pressSequentially('ind', {delay: 150});
    const options = page.locator('.ta-results');
    await options.waitFor();
    await options.locator("text=' India'").click();
    await page.locator('text="Place Order"').click();
    console.log('Placed Order');

    //Verify details on Confimation Page
    await page.locator("//\*[contains(text(), ' Thankyou for the order. ')]").waitFor();
    await expect(page.locator("//\*[contains(text(),' Thankyou for the order. ')]")).toBeVisible();
    await expect(page.locator(".order-summary").locator("td div:has-text('iphone 13 pro')")).toBeVisible();
    const orderidStr = await page.locator("//\*[contains(text(),'all the Orders in')]/parent::tr/following-sibling::tr//label").textContent();
    const orderid = orderidStr.split(' ')[2];
    console.log('Order ID: '+ orderid);

    //Validate Orders
    await page.locator("[routerLink = '/dashboard/myorders']").first().click();
    const orderedItems = page.locator('//tbody/tr');
    await orderedItems.first().waitFor();
    for(let i=0;i<await orderedItems.count();i++){
        if((await orderedItems.nth(i).locator('th').textContent()) === orderid && (await orderedItems.nth(i).locator('td').nth(1).textContent())===item){
            console.log("Ordered Successfully!");
        }
    }
});