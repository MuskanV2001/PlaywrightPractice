const {test, expect} = require('@playwright/test');

test('Browser Context Declaration', async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator("#username").fill("muskanv01lko@gmail.com");
    await page.locator("#password").fill("Mv@12345678");
    await page.locator("#terms").click();
    await page.locator("#signInBtn").click();
});

test('Check Login Error', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const username = page.locator("//input[@name='username']");
    const password = page.locator("#password");

    await page.locator("#username").fill("example@gmail");
    await page.locator("//input[@type='password']").fill("pass");
    await page.locator("#signInBtn").click();   
    await expect(page.locator("[style *= 'block']")).toBeVisible();
    console.log(await page.locator("[style *= 'block']").textContent());

    await username.clear();
    await username.fill("rahulshettyacademy");
    await password.clear();
    await password.fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();   

    const product = page.locator("//a[contains(text(),'iphone X')]/parent::h4/following-sibling::p");
    const productTitles = page.locator(".card-body a");
    console.log(await product.textContent());

    console.log(await productTitles.first().textContent());

    const allTitles = await productTitles.allTextContents();
    console.log(allTitles);
});

test('Page Fixture', async({page}) => {
    await page.goto("https://google.com");
});


test('Ecommerce App', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const items = page.locator(".card-body h5 b");

    await email.fill("muskanv01lko@gmail.com");
    await password.fill("Mv@12345678");
    await page.locator("#login").click();

    console.log(await items.first().textContent());

    console.log("All available items: " + await items.allTextContents());

})


test.only('Ecommerce App with waiting for API Responses', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const items = page.locator(".card-body h5 b");

    await email.fill("muskanv01lko@gmail.com");
    await password.fill("Mv@12345678");
    await page.locator("#login").click();

    await page.waitForLoadState('networkidle');
    console.log("Available Items: " + await items.allTextContents());
});