class OrdersPage{
    constructor(page){
        this.page = page;
        this.orderedItems = page.locator('//tbody/tr');
    }

    async validateOrders(orderid, product){
        await this.orderedItems.first().waitFor();
        for(let i=0;i<await this.orderedItems.count();i++){
            if((await this.orderedItems.nth(i).locator('th').textContent()) === orderid && (await this.orderedItems.nth(i).locator('td').nth(1).textContent())===product){
                console.log("Ordered Successfully!");
        }
    }
    }
}

export{OrdersPage};