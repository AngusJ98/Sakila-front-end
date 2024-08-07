/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

/// <reference types="cypress" />

context('Navigation', () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/")
      cy.get('nav a').contains('Actors').click()
    })
  
    it('cy.go() - go back or forward in the browser\'s history', () => {
  
      cy.location('pathname').should('include', 'actors')
  
      cy.go('back')
      cy.location('pathname').should('not.include', 'actors')
  
      cy.go('forward')
      cy.location('pathname').should('include', 'actors')
  
      // clicking back
      cy.go(-1)
      cy.location('pathname').should('not.include', 'actors')
  
      // clicking forward
      cy.go(1)
      cy.location('pathname').should('include', 'actors')
    })
  
    it('cy.reload() - reload the page', () => {
      // https://on.cypress.io/reload
      cy.reload()
  
      // reload the page without using the cache
      cy.reload(true)
    })
  
    it('cy.visit() - visit a remote url', () => {
      // Visit any sub-domain of your current domain
      // Pass options to the visit
      cy.visit('http://localhost:5173/actors', {
        timeout: 50000, // increase total time for the visit to resolve
        onBeforeLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
        },
        onLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
          cy.get(".errorPage").should("not.exist")
        },
      })
    })
  })
  