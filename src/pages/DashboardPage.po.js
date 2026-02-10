class DashboardPage{
    constructor(page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.productnames = page.locator(".card-body b");
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
    }

    async displayProducts(){
        await this.productnames.first().waitFor();
        console.log("Available Products: " + await this.productnames.allTextContents());
    }

    async addToCart(product){
        await this.products.first().waitFor();
        const count = await this.products.count();
        for(let i=0;i<count;++i){
            if(await this.products.nth(i).locator('b').textContent()===product){
                console.log('Item available');
                await this.products.nth(i).locator('text="Add To Cart"').click();
                break;
            }
        }
    }

    async navToCart(){
        await this.cart.click();
    }
}

export {DashboardPage};