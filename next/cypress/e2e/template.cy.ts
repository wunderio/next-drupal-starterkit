/// <reference types="cypress" />

// @ts-ignore
describe("Example test", () => {
  it("Logs in and is able to fill the webform", () => {
    cy.visit("https://frontend.lndo.site/auth/login?callbackUrl=%2Fen%2F");
    cy.get("input#username").type("testuser1");
    cy.get("input#password").type("test").type("{enter}");
    cy.wait(5000);
    cy.get("input#name").type("Mario");
    cy.get("input#email").type("mario.vercellotti@wunder.io");
    cy.get("textarea#message").type("hello hello!");
    cy.get("input#subject").type("cypress testing 101").type("{enter}");
    cy.wait(3000);
  });
});
