const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataForOrder : {
        useremail : "muskanv01lko@gmail.com",
        password : "Mv@12345678",
        productName: "iphone 13 pro",
        country : "ind"
    }
});