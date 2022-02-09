describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('username').find('input').should('be.visible')
      cy.contains('password').find('input').should('be.visible')
      cy.contains('Login')
    })
  })