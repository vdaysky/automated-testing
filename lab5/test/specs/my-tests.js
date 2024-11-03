import assert from "node:assert";

describe("Sample", () => {

    beforeEach(async () => {
        await driver.terminateApp('io.appium.android.apis')
        await driver.activateApp('io.appium.android.apis')
    });

    it("should enter text", async () => {
        const views = await driver.$("//android.widget.TextView[@content-desc='Views']");
        await views.click();

        const autoComplete = await driver.$("//android.widget.TextView[@content-desc='Auto Complete']");
        await autoComplete.click();

        const screenTop = await driver.$("//android.widget.TextView[@content-desc='1. Screen Top']");
        await screenTop.click();

        const giveMeFocusButton = await driver.$("//android.widget.Button[@content-desc='Give me Focus']");
        await giveMeFocusButton.click();

        const autocompleteInput = await driver.$("//android.widget.AutoCompleteTextView[@resource-id='io.appium.android.apis:id/edit']");
        await autocompleteInput.click();
        await autocompleteInput.addValue("u");
        await autocompleteInput.addValue("k");

        const enteredText = await autocompleteInput.getText();
        assert(enteredText === "uk", "invalid text")
    })


    it("should enter text in different way", async () => {

        const views = await driver.$("~Views");
        await views.click();

        const autoComplete = await driver.$("~Auto Complete");
        await autoComplete.click();

        const screenTop = await driver.$("~1. Screen Top");
        await screenTop.click();

        const giveMeFocusButton = await driver.$("~Give me Focus");
        await giveMeFocusButton.click();

        const autocompleteInput = await driver.$("id:io.appium.android.apis:id/edit");
        await autocompleteInput.click();
        await autocompleteInput.addValue("u");
        await autocompleteInput.addValue("k");

        const enteredText = await autocompleteInput.getText();
        assert(enteredText == "uk", "Invalid text entered")
    });

    it("should navigate to Action Bar and check display options buttons", async () => {
        const appButton = await driver.$("//android.widget.TextView[@content-desc='App']");
        await appButton.click();

        const actionBarButton = await driver.$("//android.widget.TextView[@content-desc='Action Bar']");
        await actionBarButton.click();

        const displayOptionsButton = await driver.$("//android.widget.TextView[@content-desc='Display Options']");
        await displayOptionsButton.click();

        const buttonsToCheck = [
            "DISPLAY_HOME_AS_UP",
            "DISPLAY_SHOW_HOME",
            "DISPLAY_USE_LOGO",
            "DISPLAY_SHOW_TITLE",
            "DISPLAY_SHOW_CUSTOM",
            "Navigation",
            "Cycle Custom View Gravity"
        ];

        for (const buttonDesc of buttonsToCheck) {
            const button = await driver.$(`//android.widget.Button[@content-desc='${buttonDesc}']`);
            const isDisplayed = await button.isDisplayed();

            assert(isDisplayed, `Button with content description '${buttonDesc}' is not displayed on the page.`)
        }
    });

    it("should add messages to LogTextBox", async () => {
        const textButton = await driver.$("//android.widget.TextView[@content-desc='Text']");
        await textButton.click();

        const logTextBoxButton = await driver.$("//android.widget.TextView[@content-desc='LogTextBox']");
        await logTextBoxButton.click();

        const addButton = await driver.$("//android.widget.Button[@content-desc='Add']");
        await addButton.click();

        const logTextBox = await driver.$("//android.widget.TextView[@resource-id='io.appium.android.apis:id/text']");
        const firstMessage = await logTextBox.getText();

        if (firstMessage !== "This is a test\n") {
            throw new Error(`Expected "This is a test\\n", but got "${firstMessage}"`);
        }

        await addButton.click();

        const secondMessage = await logTextBox.getText();
        const expectedMessages = "This is a test\nThis is a test\n";

        assert(secondMessage === expectedMessages, `Expected two messages inside LogTextBox, but got "${secondMessage}"`)

    });
})
