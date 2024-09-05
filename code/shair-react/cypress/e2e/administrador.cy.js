describe('Página de administrador', () => {
  it('No debería ingresar a la página del administrador', () => {
    cy.visit('/administracion/administrador')
  })
})