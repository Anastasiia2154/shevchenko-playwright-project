import { test, expect } from "@playwright/test";
import { GaragePage, ProfilePage } from "./pages";

test("Change response body test", async ({ page }) => {
  const garagePage = new GaragePage(page);
  const profilePage = new ProfilePage(page);

  await page.route(
    "https://qauto.forstudy.space/api/users/profile",
    async (route) => {
      const customResponse = {
        status: "ok",
        data: {
          userId: 999999,
          photoFilename: "default-user.png",
          name: "Luke",
          lastName: "Skywalker",
        },
      };

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(customResponse),
      });
    }
  );
  await page.goto("/");
  await garagePage.shouldSeeMainGaragePage();
  await page.goto("/panel/profile");
  await profilePage.shouldSeeUserProfile("Luke Skywalker");
});

test.describe("Positive car tests", () => {
  test("Add car test", async ({request }) => {
    const apiResponse = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          carBrandId: 2,
          carModelId: 8,
          mileage: 800,
        },
      }
    );

    expect(apiResponse.status()).toBe(201);
    const body = await apiResponse.json();
    expect(body.status).toBe("ok");
    expect(body.data.carBrandId).toBe(2);
    expect(body.data.carModelId).toBe(8);
    expect(body.data.initialMileage).toBe(800);
  });
});

test.describe("Negative car tests", () => {
  test("Add car with invalid data type test", async ({request }) => {
    const apiResponse = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          carBrandId: "test",
          carModelId: "test",
          mileage: 800,
        },
      }
    );
    const body = await apiResponse.json();
    expect(apiResponse.status()).toBe(400);
    expect(body.message).toBe("Invalid car brand type");
  });

  test("Add car with missing data test", async ({ page, request }) => {
    const apiResponse = await request.post(
      "https://qauto.forstudy.space/api/cars",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          carBrandId: 1,
          mileage: 800,
        },
      }
    );
    const body = await apiResponse.json();
    expect(apiResponse.status()).toBe(400);
    expect(body.message).toBe("Car model id is required");
  });
});
