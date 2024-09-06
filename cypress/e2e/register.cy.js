import { errorMessages } from "../../src/components/Register";

describe('Register Page', () => {
  describe("Error Messages", () => {
    it("Name input throws error for 2 chars", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="ad-input"]').type("al")
      //assert
      cy.contains(errorMessages.ad)
    })

    it("Surname input throws error for 2 chars", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="soyad-input"]').type("ak")
      //assert
      cy.contains(errorMessages.soyad)
    })
    
    it("Email input throws error for alper@wit.", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="email-input"]').type("alper@wit.")
      //assert
      cy.contains(errorMessages.email)
    })

    it("Password input throws error for 1234", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="password-input"]').type("1234")
      //assert
      cy.contains(errorMessages.password)
    })
  })
})