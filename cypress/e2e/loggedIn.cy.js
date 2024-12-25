describe('Logged in tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Log in').click()
        cy.get('#username').click().type('user@example.com')
        cy.get('#password').click().type('pass_1')
        cy.contains('Log In').click()
    });

    it('Visit profile', () => {
        cy.get('.w-10').click()
        cy.contains('My Profile').click()
    })


    it('Visit a project', () => {
        cy.get(':nth-child(2) > .container > .flex > :nth-child(1)').click()
        cy.url().should('include', '/projects/')
    })


    it('Make a payment', () => {
        cy.get(':nth-child(2) > .container > .flex > :nth-child(1)').click()
        cy.get('#inputMoneyAmount').type('125')
        cy.contains('Pay').click()
        //TO-DO: Review the database it is using
        //cy.contains('Confirm').click()
    })


    it('Search projects', () => {
        cy.get(':nth-child(2) > .flex > .w-full').click().type('gard')
        cy.contains('Search').click()
        cy.contains('Garden')
    })

})