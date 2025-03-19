import {Page, Locator, expect} from "playwright/test"
import {GlobalElements} from "./global-elements.po";
import {ShoppingCartPageElements} from "./shopping-cart-page-elements.po";

const CHECKOUT_YOUR_INFO = 'Checkout: Your Information';
const CHECKOUT_OVERVIEW = 'Checkout: Overview';
const CHECKOUT_COMPLETE = 'Checkout: Complete!';

export class CheckoutPageElements{
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator
    readonly continueBtn: Locator
    readonly cancelBtn: Locator
    readonly finishBtn: Locator
    readonly backHomeBtn: Locator
    readonly orderCompleteHeader: Locator
    readonly errorMsg: Locator


    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.zipCodeInput = page.locator('[data-test="postalCode"]')
        this.continueBtn = page.locator('[data-test="continue"]')
        this.cancelBtn = page.locator('[data-test="cancel"]')
        this.finishBtn = page.locator('[data-test="finish"]')
        this.backHomeBtn = page.locator('[data-test="back-to-products"]')
        this.orderCompleteHeader = page.locator('[data-test="complete-header"]')
        this.errorMsg = page.locator('[data-test="error"]')
    }

    async reachCheckoutPage(inventoryPageElements, shoppingCartPageElements: ShoppingCartPageElements, globalElements, loginPageElements){
        await loginPageElements.successfulLogin(globalElements);
        await inventoryPageElements.sauceLabsBackpackAddBtn.click()
        await expect(inventoryPageElements.sauceLabsBackpackRemoveBtn).toBeVisible()
        await globalElements.shoppingCartBtn.click()
        await expect(globalElements.pageHeader).toHaveText('Your Cart')
        await expect(shoppingCartPageElements.sauceLabsBackpackItem).toBeVisible()
        await shoppingCartPageElements.checkoutBtn.click()
        await expect(globalElements.pageHeader).toHaveText(CHECKOUT_YOUR_INFO)
    }

    async submitForm(firstName: string, lastName: string, zipCode: string){
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.zipCodeInput.fill(zipCode)
        await this.continueBtn.click()
    }

    async submitFormAndExpectError(globalElements: GlobalElements, firstName: string, lastName: string, zipCode: string, errorMsg: string){
        await this.submitForm(firstName, lastName, zipCode)
        await expect(globalElements.errorMsg).toContainText(errorMsg)
    }

    async checkoutOverview(globalElements: GlobalElements) {
        await this.submitForm('test', 'test', '12345')
        await expect(globalElements.pageHeader).toHaveText(CHECKOUT_OVERVIEW)
    }

    async checkoutComplete(globalElements: GlobalElements) {
        await this.finishBtn.click()
        await expect(globalElements.pageHeader).toHaveText(CHECKOUT_COMPLETE)
    }
}