describe('Not logged in tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('Visit a project', () => {
    cy.get('#project-card').click()
    cy.url().should('include', '/projects/')
  })


  it('Make a payment', () => {
    cy.get('#project-card').click()
    cy.get('#inputMoneyAmount').type('125')
    cy.contains('Pay').click()
    cy.contains('You need to be logged in to make a payment.')
  })


  it('Search projects', () => {
    cy.get('#search-input').click().type('gard')
    cy.get('#search-submit').click()
    cy.contains('Garden')
  })

})