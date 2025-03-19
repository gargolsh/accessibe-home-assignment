import {Page, Locator, expect} from "playwright/test";
import {GlobalElements} from "./global-elements.po";


export class LoginPageElements{
    public baseUrl: string = process.env.BASE_URL
    public validUser = process.env.VALID_USER
    public validUserPassword = process.env.VALID_USER_PASSWORD
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginBtn: Locator
    readonly loginCredList: Locator


    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginBtn = page.locator('[data-test="login-button"]')
        this.loginCredList = page.locator('[data-test="login-credentials"]')
    }

    async loginUser(username: string, password: string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }

    async successfulLogin(globalElements: GlobalElements) {
        await this.loginUser(this.validUser, this.validUserPassword)
        await expect(globalElements.pageHeader).toHaveText('Products')
    }

    async loginAndExpectError(globalElements: GlobalElements, username: string, password: string, errorMsg: string) {
        await this.loginUser(username, password)
        await expect(globalElements.errorMsg).toContainText(errorMsg)
    }
}