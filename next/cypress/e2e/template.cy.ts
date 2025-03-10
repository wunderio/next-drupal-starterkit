/// <reference types="cypress" />

import { randomBytes } from "crypto";

import { extractLinkFromString } from "../support/utils";

describe("Frontend test for Login, Sending Message, Checking Dashboard", () => {
  it("Logs in and is able to fill the webform and see the results in the dashboard", () => {
    cy.login("testuser1", "test");
    // Fill in the webform:
    cy.get('input[name="name"]').type("Test user");
    cy.get('input[name="email"]').type("testuser1@example.com");
    cy.get('textarea[name="message"]').type("hello from Cypress!");
    cy.get('input[name="subject"]').type("cypress testing 101").type("{enter}");
    cy.wait(1000);
    cy.contains("Success").should("be.visible");
    // Navigate to the dashboard and check if the message is there:
    cy.contains("testuser1").click();
    cy.wait(1000);
    cy.contains("Dashboard").click();
    cy.contains("See more").click();
    cy.contains("hello from Cypress!").should("be.visible");
  });
});

describe("Frontend Test for Search Functionality", () => {
  it("Opens the page, performs search, and verifies search results", () => {
    // Navigating to the main page and clicking on Search button
    const searchUrl = Cypress.env("FRONTEND_URL") + "/search";
    cy.visit(searchUrl);
    cy.wait(1000);
    // Searching for an article:
    cy.get("input[type=search]").type("Example article");
    // Waiting for the search results to load
    cy.wait(1000);
    // Verifying results
    cy.get(".ais-Hits-item").should("be.visible");
    cy.contains("Example Article: A Step-by-Step Guide to [Topic]").should(
      "be.visible",
    );
  });
});

describe("Frontend Test for Language Switching", () => {
  it("Opens the page, switches language and verifies it", () => {
    // Navigating to the main page and clicking on Language button
    cy.visit(Cypress.env("FRONTEND_URL"));
    cy.get('[data-language-name="English"]').click({ force: true });
    cy.wait(500);
    // Clicking through the language options and checking translations
    cy.contains("Suomi").click({ force: true });
    cy.wait(500);
    cy.contains("Monikielinen ja mielikuvituksellinen kokoonpano").should(
      "be.visible",
    );
    cy.contains("Suomi").click({ force: true });
    cy.wait(500);
    cy.contains("Svenska").click({ force: true });
    cy.wait(500);
    cy.contains("En flerspråkig och egensinnig installation").should(
      "be.visible",
    );
  });
});

describe("Basic Layout Test", () => {
  it("Opens the page, checks if header and footer is in place", () => {
    // Navigating to the main page and checking if header and footer exists
    cy.visit(Cypress.env("FRONTEND_URL"));
    // Checking if header exists
    cy.get("header").should("be.visible").should("exist");
    // Checking if footer exists
    cy.get("footer").should("be.visible").should("exist");
  });
});

describe("Menu Navigation Test", () => {
  it("Open the navigation menu to the third level and visits a page", () => {
    cy.testMenuAtViewport("macbook-15");
  });
});

describe("Menu Navigation Test mobile", () => {
  it("Open the navigation menu to the third level and visits a page", () => {
    cy.testMenuAtViewport("iphone-6");
  });
});

// Data to create a new user account:
const username = "testuser_" + randomBytes(2).toString("hex");
const testUserAccount = {
  username,
  email: username + "@example.com",
  originalPassword: "mypassword",
  newPassword: "newpassword",
};

// Data to request a new password:
describe("Register a new user workflow test", () => {
  it("Registers a new user account, and logs in with it", () => {
    const registerUrl = Cypress.env("FRONTEND_URL") + "/register";
    cy.visit(registerUrl);
    cy.get('input[name="name"]').type(testUserAccount.username);
    cy.get('input[name="email"]').type(testUserAccount.email);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.contains("Success").should("be.visible");

    // Check that mailpit has received the email.
    cy.mailpitHasEmailsBySubject(
      `Account details for ${testUserAccount.username} at Drush Site-Install`,
    );

    // Get the link from the latest email received by mailpit:
    cy.mailpitGetMail().then((result) => {
      const setYourPasswordLink = extractLinkFromString(result.Text);
      cy.visit(setYourPasswordLink);
      cy.get('input[type="submit"]').click();
    });

    cy.contains(testUserAccount.username).should("be.visible");

    cy.get("input[name='pass[pass1]']").type(testUserAccount.originalPassword);
    cy.wait(500);
    cy.get("input[name='pass[pass2]']").type(testUserAccount.originalPassword);
    cy.get('input[type="submit"]').click();
    cy.login(testUserAccount.username, testUserAccount.originalPassword);
  });
});

describe("Request a new password workflow test", () => {
  it("Requests a new password and logs in with it", () => {
    const loginUrl = Cypress.env("FRONTEND_URL") + "/login?callbackUrl=%2F";
    cy.visit(loginUrl);
    cy.contains("Reset your password").click();
    cy.get('input[name="name"]').type(testUserAccount.email);
    cy.get('input[type="submit"]').click();
    cy.wait(2000);
    cy.contains("check your email for a link to reset your password").should(
      "be.visible",
    );

    // Check that mailpit has received the email:
    cy.mailpitHasEmailsBySubject(
      `Replacement login information for ${testUserAccount.username} at Drush Site-Install`,
    );

    // Get the link from the latest email received by mailpit:
    cy.mailpitGetMail().then((result) => {
      const resetLink = extractLinkFromString(result.Text);
      cy.visit(resetLink);
      // Submit the form confirming that you want to change the password:
      cy.get('input[type="submit"]').click();
    });

    // Set the new password twice and submit the form.
    cy.get("input[name='pass[pass1]']").type(testUserAccount.newPassword);
    cy.wait(500);
    cy.get("input[name='pass[pass2]']").type(testUserAccount.newPassword);
    cy.get('input[type="submit"]').click();
    // We can now log in with the new password.
    cy.login(testUserAccount.username, testUserAccount.newPassword);
  });
});

export {};
