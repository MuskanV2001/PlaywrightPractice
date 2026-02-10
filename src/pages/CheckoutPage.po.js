class CheckoutPage{
    constructor(page){
        this.page = this.page;
        this.countryInput = page.getByPlaceholder('Select Country');
        this.options = page.locator('.ta-results');
        this.optionIndia = this.options.locator("text=' India'");
        this.placeOrderBtn = page.locator('text="Place Order"');
    }

    async placeOrder(country){
        await this.countryInput.pressSequentially(country, {delay: 150});
        await this.options.waitFor();
        await this.optionIndia.click();
        await this.placeOrderBtn.click();
        console.log('Placed Order');
    }
    

}

export {CheckoutPage};