import ForgotPassPage from "../support/pages/forgotpass";
import toast from "../support/components/toast";

describe('Resgate de senha', function (){
    before(function (){
        cy.fixture('recovery').then(function (recovery){
            this.data = recovery
        })
    })

    context('Quando o usuário esquece a senha', function (){

        before(function (){
            cy.postUser(this.data)
        })

        it('deve poder resgatar por email', function (){
            ForgotPassPage.go()
            ForgotPassPage.form(this.data.email)
            ForgotPassPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            ForgotPassPage.toast.shouldHaveText(message)
            cy.wait(7000)

        })
    })

})