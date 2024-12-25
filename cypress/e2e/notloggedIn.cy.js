describe('Not logged in tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });


  it('Visit a project', () => {
    cy.get(':nth-child(2) > .container > .flex > :nth-child(1)').click()
    cy.url().should('include', '/projects/')
  })


  it('Make a payment', () => {
    cy.get(':nth-child(2) > .container > .flex > :nth-child(1)').click()
    cy.get('#inputMoneyAmount').type('125')
    cy.contains('Pay').click()
    cy.contains('You need to be logged in to make a payment.')
    //TO-DO: Review the database it is using
    //cy.contains('Confirm').click()
  })


  it('Search projects', () => {
    cy.get(':nth-child(2) > .flex > .w-full').click().type('gard')
    cy.contains('Search').click()
    cy.contains('Garden')
  })

})