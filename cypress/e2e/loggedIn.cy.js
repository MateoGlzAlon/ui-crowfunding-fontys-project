describe('Logged in tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Log in').click()
        cy.get('#username').click().type('user@example.com')
        cy.get('#password').click().type('pass1')
        cy.contains('Log In').click()
    });

    it('Visit profile', () => {
        cy.get('#user-avatar').click()
        cy.contains('My Profile').click()
    })


    it('Visit a project', () => {
        cy.get('#project-card').click()
        cy.url().should('include', '/projects/')
    })


    it('Make a payment', () => {
        cy.get('#project-card').click()
        cy.get('#inputMoneyAmount').type('125')
        cy.contains('Pay').click()
        cy.contains('Confirm').click()
    })


    it('Search projects', () => {
        cy.get('#search-input').click().type('gard')
        cy.get('#search-submit').click()
        cy.contains('Garden')
    })

})