describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[cy-data=user-icon-button]").click()
    cy.get("[cy-data=Login]").click()
  })
})