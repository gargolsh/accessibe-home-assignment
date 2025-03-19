import {expect, Locator, Page} from "playwright/test";
import {InventoryPageElements} from "./inventory-page-elements.po";
import {LoginPageElements} from "./login-page-elements.po";

const PRODUCTS = 'Products';
const YOUR_CART = 'Your Cart';

export class GlobalElements {
    public saucelabsURL = process.env.SAUCELABS_URL
    public inventoryPageURL = process.env.INVENTORY_PAGE_URL
    readonly page: Page
    readonly errorMsg: Locator
    readonly menuOpenBtn: Locator
    readonly menuCloseBtn: Locator
    readonly menuAllItemsBtn: Locator
    readonly menuAboutBtn: Locator
    readonly menuLogoutBtn: Locator
    readonly menuResetBtn: Locator
    readonly shoppingCartBtn: Locator
    readonly shoppingCartBadge: Locator
    readonly pageHeader: Locator
    readonly sauceLabsHomePageLink: Locator


    constructor(page: Page) {
        this.page = page
        this.errorMsg = page.locator('[data-test="error"]')
        this.menuOpenBtn = page.getByRole('button', { name: 'Open Menu' })
        this.menuCloseBtn = page.getByRole('button', { name: 'Close Menu' })
        this.menuAllItemsBtn = page.locator('[data-test="inventory-sidebar-link"]')
        this.menuAboutBtn = page.locator('[data-test="about-sidebar-link"]')
        this.menuLogoutBtn = page.locator('[data-test="logout-sidebar-link"]')
        this.menuResetBtn = page.locator('[data-test="reset-sidebar-link"]')
        this.shoppingCartBtn = page.locator('[data-test="shopping-cart-link"]')
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.pageHeader = page.locator('[data-test="title"]')
        this.sauceLabsHomePageLink = page.getByRole('link', { name: 'Saucelabs' })
    }

    async validateAllMenuItems(){
        await this.menuOpenBtn.click()
        await expect(this.menuAllItemsBtn).toBeVisible()
        await expect(this.menuAboutBtn).toBeVisible()
        await expect(this.menuLogoutBtn).toBeVisible()
        await expect(this.menuResetBtn).toBeVisible()
        await expect(this.menuCloseBtn).toBeVisible()
        await this.menuCloseBtn.click()
    }

    async clickAndValidateAllItemsMenuBtn() {
        await this.menuOpenBtn.click()
        await this.menuAllItemsBtn.click()
        await expect(this.pageHeader).toHaveText(PRODUCTS)
    }

    async  clickAndValidateAboutMenuBtn(page: Page) {
        await this.menuOpenBtn.click()
        await this.menuAboutBtn.click()
        await expect(page.url()).toEqual(this.saucelabsURL)
        await expect(this.sauceLabsHomePageLink).toBeVisible()
        await page.goBack()
        await expect(page.url()).toEqual(this.inventoryPageURL)
        await expect(this.pageHeader).toHaveText(PRODUCTS)
    }

    async validateCartBadgeReset(inventoryPageElements: InventoryPageElements) {
        await inventoryPageElements.sauceLabsBackpackAddBtn.click()
        await expect(inventoryPageElements.sauceLabsBackpackRemoveBtn).toBeVisible()
        await expect(this.shoppingCartBadge).toHaveText('1')
        await this.menuOpenBtn.click()
        await this.menuResetBtn.click()
        await expect(this.shoppingCartBadge).toHaveCount(0)
        await this.menuCloseBtn.click()
    }

    async validateItemRemoveBtnReset(inventoryPageElements: InventoryPageElements) {
        await inventoryPageElements.sauceLabsBackpackAddBtn.click()
        await expect(inventoryPageElements.sauceLabsBackpackRemoveBtn).toBeVisible()
        await this.menuOpenBtn.click()
        await this.menuResetBtn.click()
        await this.menuCloseBtn.click()
        await expect(inventoryPageElements.sauceLabsBackpackRemoveBtn).toHaveCount(0)
    }

    async clickAndValidateLogoutMenuBtn(loginPageElements: LoginPageElements) {
        await this.menuOpenBtn.click()
        await this.menuLogoutBtn.click()
        await expect(loginPageElements.loginCredList).toBeVisible()
    }

    async shoppingCart() {
        await this.shoppingCartBtn.click()
        await expect(this.pageHeader).toHaveText(YOUR_CART)
    }

}