it('deve cadastrar um novo usuário', function (){
    const name = 'Kevin Silva'
    const email = 'kevin.silva@samuraibs.com'
    const password = "pwd123"

    cy.visit('/signup')

    cy.get("input[placeholder='Nome']").type(name)
    cy.get("input[placeholder='E-mail']").type(email)
    cy.get("input[placeholder='Senha']").type(password)
})