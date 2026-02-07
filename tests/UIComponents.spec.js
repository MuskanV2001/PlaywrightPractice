const {test, expect} = require('@playwright/test');


test('Handling DropDowns', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await page.locator("#username").fill("muskanv01lko@gmail.com");
    await page.locator("#password").fill("Mv@12345678");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");
    await page.locator("#terms").click();
    await page.locator("#signInBtn").click();
    await page.pause();
});


test('Handling Page popups', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await page.locator("#username").fill("muskanv01lko@gmail.com");
    await page.locator("#password").fill("Mv@12345678");
    await page.locator("//input[@value='user']/following-sibling::span").click();
    expect(await page.locator("//div[@class='modal-body']").isVisible());
    await page.locator("#okayBtn").click();
});

// test('', async({browser})=>{
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('');
// });


