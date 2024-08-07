/// <reference types="cypress" />
describe('actors page test', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:5173/actors')
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

    it('makes only a single api request while loading', () => {
        
        let count = 0
    
        cy.intercept('GET','**/api/actors', (req) => {
            req.continue((res) => {
                count = count+1;
            })
        })
    
        //... your tests
        cy.get('.instanceContainerList h3').first().then( () => {
            expect(count,'Number of times intercepted').to.equal(1) 
        })
        
    })

    it("doesn't make api requests while searching", () => {
        let count = 0
    
        cy.intercept('GET','**/api/actors', (req) => {
            req.continue((res) => {
                count = count+1;
            })
        })

        cy.get("input").type("ED")
        
        expect(count,'Number of times intercepted').to.equal(0) 
        cy.get("input").clear()
        cy.get("input").type("Davis")
        expect(count,'Number of times intercepted').to.equal(0) 
    })

    it('has a list of actors', () => {
        cy.get(".instanceContainerList").should("have.length.at.least", 1)
    })

    it("has all actors names in capital letters", () => {
        const regex = new RegExp(`^[^a-z]*$`)
        cy.get(".instanceContainerList h3").each(($h) => 
            expect($h.text()).to.match(regex)
        )
    })

    it("directs to the actor form page", () => {
        cy.contains("New Actor").click()
        cy.location('pathname').should('include', 'actors/form')
    })

})