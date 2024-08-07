import ActorContainer from "./ActorContainer"


describe("<ActorContainer />", () => {
    beforeEach(() => {
        cy.mount(<ActorContainer />)
    })
    it("should have a search bar", () => {

        cy.get(".searchBar").should("exist")
    })
  
    
    it("should have a new actor button", () => {

        cy.get(".instanceList a").contains("New Actor").should("exist")
    })
    
    it("should have a container for actors", () => {

        cy.get(".instanceContainerList").should("exist")
    })
    
    it('makes only a single api request while loading', () => {
        
        let count = 0
    
        cy.intercept('GET','**/api/actors', (req) => {
            req.continue(() => {
                count = count+1;
            })
        })
    
        //... your tests
        cy.get('.instanceContainerList').first().then( () => {
            expect(count,'Number of times intercepted').to.equal(1) 
        })
        
    })
  })