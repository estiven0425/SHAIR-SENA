describe('Página de superadministrador', () => {
  it('No debería poder acceder a la página del superadministrador', () => {
    cy.visit('/administracion/superadministrador')
  })
})