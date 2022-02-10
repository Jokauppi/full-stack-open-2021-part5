describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tes Ter',
      username: 'tester',
      password: 'testtest'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username').find('input').should('be.visible')
    cy.contains('password').find('input').should('be.visible')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('testtest')
      cy.contains('Login').click()

      cy.contains('Logged in as Tes Ter')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrongtest')
      cy.contains('Login').click()

      cy.contains('Wrong username or password')
      cy.get('html').should('not.contain', 'Logged in as Tes Ter')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'tester', password: 'testtest'
      }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Add a new blog').click()

      cy.get('#title-field').type('blog title')
      cy.get('#author-field').type('blog author')
      cy.get('#url-field').type('url.com')
      cy.get('#create-button').click()

      cy.contains('blog title | blog author')
    })

  })
})