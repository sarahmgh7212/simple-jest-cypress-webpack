/* eslint-disable testing-library/prefer-screen-queries */
import {buildUser} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = buildUser()

    cy.visit('/')
    cy.findByText(/register/i).click()
    cy.findByLabelText(/username/i).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByText(/submit/i)
      .click()
      .assertHome()
      .assertLoggedInAs(user)
  })

  // eslint-disable-next-line jest/no-focused-tests
  it.only(`should show an error message if there's an error while registering`, () => {
    cy.server().route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
    })

    cy.visit('register')
    cy.findByText(/submit/i).click()
    cy.findByText(/error.*try again/i)
  })
})
