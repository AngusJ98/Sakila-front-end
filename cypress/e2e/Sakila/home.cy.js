/// <reference types="cypress" />

describe('home page test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:5173/')
    })
  
    it('has a nav bar', () => {
      // Ensure the navbar has the correct length, and values
        cy.get("nav").should("exist")
    })

    it('has a nav bar that contains the correct values and has the correct length', () => {
        // Ensure the navbar has the correct length, and values
        cy.get("nav a").should('have.length', 3)
    
  
        cy.get("nav a").first().should('have.text', 'Home')
        cy.get("nav a").eq(1).should('have.text', 'Films')
        cy.get("nav a").eq(2).should('have.text', 'Actors')
      })

    it('has a title and subtitle', () => {
        cy.get(".websiteTitle").should("exist")
        cy.get(".subtext").should("exist")
    })

})