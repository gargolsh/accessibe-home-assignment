import {expect, test} from 'playwright/test';
import {LoginPageElements} from "../page_elements/login-page-elements.po";
import {InventoryPageElements} from "../page_elements/inventory-page-elements.po";
import {ShoppingCartPageElements} from "../page_elements/shopping-cart-page-elements.po"
import {CheckoutPageElements} from "../page_elements/checkout-page-elements.po";
import {GlobalElements} from "../page_elements/global-elements.po";


let loginPageElements

test.beforeEach(async ({ page }) => {
    loginPageElements = new LoginPageElements(page)

    await page.goto(loginPageElements.baseUrl)
    await expect(loginPageElements.loginCredList).toBeVisible()
});


test('successful login flow', async ({ page }) => {
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
});


test('failed login flow', async ({page }) => {
    const globalElements = new GlobalElements(page)

    await loginPageElements.loginAndExpectError(globalElements, 'locked_out_user', loginPageElements.validUserPassword, 'Sorry, this user has been locked out.');
});


[
    {testName: 'username & password not populated', username: '', password: '', errorMessage: 'Username is required'},
    {testName: 'username populated, password not populated', username: 'test', password: '', errorMessage: 'Password is required'},
    {testName: 'invalid username and password', username: 'test', password: 'test', errorMessage: 'Username and password do not match any user in this service'}
    ].forEach(({testName, username, password, errorMessage}) => {
        test(`login input validation test - ${testName}`, async ({page }) => {
            const globalElements = new GlobalElements(page)

            await loginPageElements.loginAndExpectError(globalElements, username, password, errorMessage);
        });
});


[
    {testName: 'firstName, password & zipCode not populated', firstName: '', lastName: '', zipCode: '', errorMessage: 'Error: First Name is required'},
    {testName: 'username populated, password & zipCode not populated', firstName: 'test', lastName: '', zipCode: '', errorMessage: 'Error: Last Name is required'},
    {testName: 'username & password populated, zipCode not populated', firstName: 'test', lastName: 'test', zipCode: '', errorMessage: 'Error: Postal Code is required'},
    ].forEach(({testName, firstName, lastName, zipCode ,errorMessage}) => {
        test(`checkout input validation test - ${testName}`, async ({page }) => {
            const inventoryPageElements = new InventoryPageElements(page)
            const shoppingCartPageElements = new ShoppingCartPageElements(page)
            const checkoutPageElements = new CheckoutPageElements(page)
            const globalElements = new GlobalElements(page)

            await checkoutPageElements.reachCheckoutPage(inventoryPageElements, shoppingCartPageElements, globalElements, loginPageElements)
            await checkoutPageElements.submitFormAndExpectError(globalElements, firstName, lastName, zipCode, errorMessage)
    });
});


test('successful checkout flow', async ({page }) => {
    const inventoryPageElements = new InventoryPageElements(page)
    const shoppingCartPageElements = new ShoppingCartPageElements(page)
    const checkoutPageElements = new CheckoutPageElements(page)
    const globalElements = new GlobalElements(page)

    await checkoutPageElements.reachCheckoutPage(inventoryPageElements, shoppingCartPageElements, globalElements, loginPageElements)
    await checkoutPageElements.submitForm('test', 'test', '12345')
    await shoppingCartPageElements.finishCheckoutFlow(globalElements, shoppingCartPageElements, checkoutPageElements);
});


test('menu appearance validation test', async ({page}) => {
    const shoppingCartPageElements = new ShoppingCartPageElements(page)
    const checkoutPageElements = new CheckoutPageElements(page)
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.validateAllMenuItems()

    await globalElements.shoppingCart();
    await globalElements.validateAllMenuItems()

    await shoppingCartPageElements.checkout(globalElements);
    await globalElements.validateAllMenuItems()

    await checkoutPageElements.checkoutOverview(globalElements);
    await globalElements.validateAllMenuItems()

    await checkoutPageElements.checkoutComplete(globalElements);
    await globalElements.validateAllMenuItems()
});


test('menu "All Items" button test', async ({page}) => {
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.shoppingCart();
    await globalElements.clickAndValidateAllItemsMenuBtn();
});


test('menu "About" button test', async ({page}) => {
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.clickAndValidateAboutMenuBtn(page);
});


test('menu "Reset App State" button test - validate using shopping cart badge', async ({page}) => {
    const inventoryPageElements = new InventoryPageElements(page)
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.validateCartBadgeReset(inventoryPageElements);
});


// This test is inactive as it fails because of a bug in the app. When resetting the app state, the "Remove" button is still displayed on the item.

test.skip('menu "Reset App State" button test - validate using item "Remove" button', async ({page}) => {
    const inventoryPageElements = new InventoryPageElements(page)
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.validateItemRemoveBtnReset(inventoryPageElements);
});



test('menu "Logout" button test', async ({page}) => {
    const globalElements = new GlobalElements(page)

    await loginPageElements.successfulLogin(globalElements);
    await globalElements.clickAndValidateLogoutMenuBtn(loginPageElements);
});