import {Page, Locator} from "playwright/test"

export class InventoryPageElements{
    readonly page: Page
    readonly sauceLabsBackpackAddBtn: Locator
    readonly sauceLabsBackpackRemoveBtn: Locator


    constructor(page: Page) {
        this.page = page
        this.sauceLabsBackpackAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.sauceLabsBackpackRemoveBtn = page.locator('[data-test="remove-sauce-labs-backpack"]')
    }

}