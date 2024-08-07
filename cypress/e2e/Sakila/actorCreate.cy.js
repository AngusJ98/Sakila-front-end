describe('actors creation test', () => {
    

    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit("http://localhost:5173/actors/form")
    })

    it("Doesn't have a test actor already", () => {
        cy.visit("http://localhost:5173/actors/")
    })
    it("Creates an actor",() => {
        cy.get("form input").eq(0).type("Test")
        cy.get("form input").eq(1).type("Actor")
        cy.get("form button").click()

    })
    
    it("Successfully created an actor", () => {
        cy.visit("http://localhost:5173/actors/")
        cy.get(".instanceContainerList h3").last().should("have.text", "TEST ACTOR")
    })
        
    it("Deletes the actor it created", () => {
        cy.visit("http://localhost:5173/actors/")
        cy.get(".instanceContainerList h3").last().should("have.text", "TEST ACTOR")
        cy.get(".instanceContainerList h3").last().click()
        cy.get(".deleteButton").click()
        cy.location('pathname').should('include', 'actors')
        cy.location('pathname').should('not.include', 'actors/form')
        cy.get(".instanceContainerList h3").last().should("not.have.text", "TEST ACTOR")
    })

})