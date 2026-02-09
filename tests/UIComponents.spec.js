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
    expect(await page.locator("#terms").isChecked());
    await page.locator("#signInBtn").click();
    // await page.pause();
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

test('Checkboxes', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await page.locator("#username").fill("muskanv01lko@gmail.com");
    await page.locator("#password").fill("Mv@12345678");
    await page.locator("#terms").click();
    expect(await page.locator("#terms").isChecked());
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
});

test('Blinking Link Test', async({browser})=>{
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docsLink = page.locator("[href*='documents-request']");
    await expect(docsLink).toHaveAttribute('class', 'blinkingText');
    await docsLink.click();
});

test.only('Child Windows Handling', async({browser})=>{
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const docsLink = page.locator("[href*='documents-request']");

    const [newTab] = await Promise.all([context.waitForEvent('page'),
    await docsLink.click()]);
    
    expect(await newTab.locator('.red').isVisible());
    console.log(await newTab.locator('.red').textContent());
    
    
});
