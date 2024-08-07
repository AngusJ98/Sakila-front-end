import React from "react"
import NavBar from "./NavBar"

describe("<NavBar />", () => {

  it("should have all correctly named link buttons", () => {
    // No need to pass in custom initialEntries as default url is "/"
    cy.mount(<NavBar />)
  
    cy.get("a").contains("Home").should("exist")
    cy.get("a").contains("Films").should("exist")
    cy.get("a").contains("Actors").should("exist")
  })

  it("has t")
})