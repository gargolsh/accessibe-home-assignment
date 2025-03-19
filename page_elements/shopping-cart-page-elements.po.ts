import {Page, Locator, expect} from "playwright/test"
import {GlobalElements} from "./global-elements.po";
import {CheckoutPageElements} from "./checkout-page-elements.po";

export class ShoppingCartPageElements{
    readonly page: Page
    readonly checkoutBtn: Locator
    readonly continueShoppingBtn: Locator
    readonly sauceLabsBackpackItem: Locator


    constructor(page: Page) {
        this.page = page
        this.checkoutBtn = page.locator('[data-test="checkout"]')
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]')
        this.sauceLabsBackpackItem = page.getByText('Sauce Labs Backpackcarry.')

    }

    async checkout(globalElements: GlobalElements) {
        await this.checkoutBtn.click()
        await expect(globalElements.pageHeader).toHaveText('Checkout: Your Information')
    }

    async finishCheckoutFlow(globalElements: GlobalElements, shoppingCartPageElements: ShoppingCartPageElements, checkoutPageElements: CheckoutPageElements) {
        await expect(globalElements.pageHeader).toHaveText('Checkout: Overview')
        await expect(shoppingCartPageElements.sauceLabsBackpackItem).toBeVisible()
        await checkoutPageElements.finishBtn.click()
        await expect(globalElements.pageHeader).toHaveText('Checkout: Complete!')
        await expect(checkoutPageElements.orderCompleteHeader).toHaveText('Thank you for your order!')
        await checkoutPageElements.backHomeBtn.click()
        await expect(globalElements.pageHeader).toHaveText('Products')
    }
}