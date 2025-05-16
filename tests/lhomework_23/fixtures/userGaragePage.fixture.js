import { test as baseTest } from "@playwright/test";
import { GaragePage } from "../pages";

export const test = baseTest.extend({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await use(garagePage);
  },
});
