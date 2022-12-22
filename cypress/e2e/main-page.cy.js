describe('burger-constructor e2e', ()=> {
    before(function() {
        cy.visit('/login');
        cy.get('input[name="email"]').type('axlstarxx@gmail.com').should('have.value', 'axlstarxx@gmail.com')
        cy.get('input[name="password"]').type('12345').should('have.value', '12345')
        cy.get('button').click()
    });


    it('should open modal page after ingredient click', ()=> {
        //
        cy.get('div[id="Булки"]').as('bunList')
        cy.get('div[id="Соусы"]').as('sauceList')
        cy.get('div[id="Начинки"]').as('mainList')

        cy.get('@bunList').find('li').first().click()
        cy.url().should('include' , '/ingredients')
        cy.get('button').last().click()
        cy.url().should("not.include", '/ingredients')
        //TODO вынести
        const dataTransfer = new DataTransfer();
        cy.get('@bunList').find('li').first().find('img').as('bun')
        cy.get('@sauceList').find('li').first().find('img').as('sauce')
        cy.get('@mainList').find('li').first().find('img').as('main')


        cy.get('section').last().as('dropSection')

        cy.get('@bun').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });

        cy.get('@sauce').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });
        cy.get('@main').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });

        cy.get("button").contains('Оформить заказ').click()
    })
})