/* eslint-disable testing-library/prefer-screen-queries */
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    const user = cy
    user.visit('/')
    user.findByText(/^1$/).click()
    user.findByText(/^\+$/).click()
    // eslint-disable-next-line babel/no-unused-expressions
    user.findByText(/^2$/).click()
    user.findByText(/^=$/).click()
    user.findByTestId('total')
    user.should('have.text', '3')
  })
})

describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      cy.login(user)
      cy.visit('/')
      cy.findByTestId('username-display').should('have.text', user.username)
      cy.findByText(/logout/i).click()
      cy.findByTestId('username-display').should('not.exist')
    })
  })
})
