describe("My First Test", function() {
  it("Does not do much!", function() {
      cy.visit('https://example.cypress.io');
      cy.contains('type').click();
      cy.get(":nth-child(3) > ul > :nth-child(5) > a").click();
  });
});
