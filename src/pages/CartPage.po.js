class CartPage{
    constructor(page){
        this.page = page;
        this.cartItems = page.locator('.cartWrap');
        this.checkoutBtn = page.locator('text="Checkout"');
    }

    async verifyItemCheckout(){
        await this.cartItems.first().waitFor();
        const n = await this.cartItems.count();
        for(let i=0;i<n;++i){
        if(await this.cartItems.nth(i).locator("h3:has-text('iphone 13 pro')").isVisible()){
            console.log('Item added to cart');
            await this.checkoutBtn.click();
            console.log('Clicked Checkout');
            break;
        }
    }
    }
}

export{CartPage};