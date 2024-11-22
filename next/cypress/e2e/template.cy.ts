/// <reference types="cypress" />

describe("Frontend test for Login and Sending Message", () => {
  it("Logs in and is able to fill the webform", () => {
    cy.visit("https://frontend.lndo.site/auth/login?callbackUrl=%2F");
    cy.get('input[name="username"]').type("testuser1");
    cy.get('input[name="password"]').type("test").type("{enter}");
    cy.wait(3000);
    cy.get('input[name="name"]').type("Mario");
    cy.get('input[name="email"]').type("mario.vercellotti@wunder.io");
    cy.get('textarea[name="message"]').type("hello from Cypress!");
    cy.get('input[name="subject"]').type("cypress testing 101").type("{enter}");
    cy.wait(1000);
  });
});

describe("Frontend Test for Search Functionality", () => {
  it("Opens the page, performs search, and verifies search results", () => {
    // Navigating to the main page and clicking on Search button
    cy.visit("https://frontend.lndo.site/search");
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
    cy.visit("https://frontend.lndo.site");
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
    cy.visit("https://frontend.lndo.site");
    // Checking if header exists
    cy.get("header").should("be.visible").should("exist");
    // Checking if footer exists
    cy.get("footer").should("be.visible").should("exist");
  });
});

export {};
