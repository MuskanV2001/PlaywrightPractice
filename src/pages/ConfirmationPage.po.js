const {expect} = require ("@playwright/test");

class ConfirmationPage{
    constructor(page){
        this.page = page;
        this.confirmMsg = page.locator("//\*[contains(text(), ' Thankyou for the order. ')]");
        this.orderSummary = page.locator(".order-summary");
        this.orderID = page.locator("//\*[contains(text(),'all the Orders in')]/parent::tr/following-sibling::tr//label");
        this.ordersLink = page.locator("[routerLink = '/dashboard/myorders']");
    }

    async verifyOrderConfirmation(){
        await this.confirmMsg.waitFor();
        await expect(this.confirmMsg).toBeVisible();
        await expect(this.orderSummary.locator("td div:has-text('iphone 13 pro')")).toBeVisible();
        const orderidStr = await this.orderID.textContent();
        const orderid = orderidStr.split(' ')[2];
        console.log('Order ID: '+ orderid);
        return orderid;
    }

    async navToOrders(){
        this.ordersLink.first().click();
    }
}

export{ConfirmationPage};