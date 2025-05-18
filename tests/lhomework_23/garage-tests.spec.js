import { test } from "./fixtures/userGaragePage.fixture";

test("Go to Garage page", async ({ page, garagePage }) => {
  await page.goto("/");
  await garagePage.shouldSeeMainGaragePage();
});