describe('Register Page', () => {
  describe("Error Messages", () => {
    it("name input throws error for 2 chars", () => {

      //arrange
      cy.visit("http://localhost:5173/");
      //act
      cy.get('[data-cy="ad-input"]').type("em")
      //assert
      cy.contains(errorMessages.ad)
    })
  })
})