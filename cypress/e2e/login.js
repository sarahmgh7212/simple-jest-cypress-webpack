/* eslint-disable testing-library/prefer-screen-queries */

describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')
      cy.findByText(/login/i).click()
      cy.findByLabelText(/username/i).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByText(/submit/i)
        .click()

        //now let's verify things are set after login
        .assertHome()
        .assertLoggedInAs(user)
    })
  })
})
