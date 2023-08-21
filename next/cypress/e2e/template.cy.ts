/// <reference types="cypress" />

describe("Frontend test for Login and Sending Message", () => {
  it("Logs in and is able to fill the webform", () => {
    cy.visit("https://frontend.lndo.site/auth/login?callbackUrl=%2Fen%2F");
    cy.get("input#username").type("testuser1");
    cy.get("input#password").type("test").type("{enter}");
    cy.wait(3000);
    cy.get("input#name").type("Mario");
    cy.get("input#email").type("mario.vercellotti@wunder.io");
    cy.get("textarea#message").type("hello hello!");
    cy.get("input#subject").type("cypress testing 101").type("{enter}");
    cy.wait(1000);
  });
});

describe("Frontend Test for Search Functionality", () => {
  it("Opens the page, performs search, and verifies search results", () => {
    // Navigating to the main page and clicking on Search button
    cy.visit("https://frontend.lndo.site");
    cy.get('a[href="/search"]').click();
    cy.wait(500);
    // Searching for string "Drupal"
    cy.get("[data-transaction-name='search input']").type("Drupal");
    cy.get("[data-transaction-name='search submit']").click();
    // Waiting for the search results to load
    cy.wait(1000);
    // Verifying results
    cy.get(".sui-results-container").should("be.visible");
    cy.contains("Drupal and Next.js can be used together").should("be.visible");
  });
});

describe("Frontend Test for Language Switching", () => {
  it("Opens the page, switches language and verifies it", () => {
    // Navigating to the main page and clicking on Language button
    cy.visit("https://frontend.lndo.site");
    cy.contains("English").click({ force: true });
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
    cy.visit("https://frontend.lndo.site");
    // Checking if header exists
    cy.get("header").should("be.visible").should("exist");
    // Checking if footer exists
    cy.get("footer").should("be.visible").should("exist");
  });
});

export {};
