import signupPage from '../support/pages/signup'

describe('cadastro', ()=>{

    context('quando o usuário é novato', function (){
        const user = {
            name: 'Kevin Silva',
            email: 'kevin.mss@hotmail.com',
            password: 'pwd123'
        }

        before(function (){
            cy.task('removeUser',user.email)
                .then(function (result){
                    console.log(result)
                })
        })
        it('deve cadastrar com sucesso', function (){

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText("Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!")

        })
    })

    context('quando o email já existe', function (){
        const user = {
            name: 'Kevin Silva2',
            email: 'kevin.mss2@hotmail.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function (){
            cy.task('removeUser',user.email)
                .then(function (result){
                    console.log(result)
                })
        cy.request(
            'POST',
            'http://localhost:3333/users',
            user
        ).then(function (response){
            expect(response.status).to.eq(200)
        })
    })
    it('não deve cadastrar o usuário', function (){

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()
        signupPage.toast.shouldHaveText("Email já cadastrado para outro usuário.")

    })

})

    context('quando o email é incorreto', function (){
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123',
        }

        it('deve exibir mensagem de alaerta', function (){
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()

            signupPage.alertHaveText('Informe um email válido')
        })

    })

    context('quando a senha é muito curto', function (){

        const passwords = ['1','2a','ab3','abc4','ab#c5']

        beforeEach(function (){
            signupPage.go()
        })

        passwords.forEach(function (p){

            it('não deve cadastrar com a senha: ' + p, function (){

                const user = {name: 'Jason Friday',email: 'jason@gmail.com',password: p}

                signupPage.go()
                signupPage.form(user)
                signupPage.submit()
            })
        })
        afterEach(function (){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context.only('quando não preencho nenhum dos campos', function (){

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function (){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert){
            it('deve exibir ' + alert.toLocaleLowerCase(),function (){
                signupPage.alertHaveText(alert)
            })
        })

    })
})

