class LoginPage{

    constructor(page){
        this.page = page;
        this.useremail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async landOnLogin(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
    
    async validLogin(useremail, password){
        await this.useremail.fill(useremail);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

}
export {LoginPage};