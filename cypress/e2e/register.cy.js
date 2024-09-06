import { errorMessages } from "../../src/components/Register";

describe('Register Page', () => {
  describe("Error Messages", () => {
    it("name input throws error for 2 chars", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="ad-input"]').type("al")
      //assert
      cy.contains(errorMessages.ad)
    })

    it("name input throws error for 2 chars", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="soyad-input"]').type("ak")
      //assert
      cy.contains(errorMessages.soyad)
    })
  })
})