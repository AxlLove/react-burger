describe('burger-constructor e2e', ()=> {
    before(function() {
        cy.visit('/');
    });

    it('shoud open and close ingredient modal', ()=>{
        cy.get('div[id="Булки"]').find('li').first().as('testedBun')

        cy.get('@testedBun').click()
        
        cy.get('[class^=IngredientDetails_ingredientDetails__hlRGm').contains("Краторная булка N-200i")
        cy.url().should('include' , '/ingredients')

        cy.get('button').last().click()
        cy.url().should("not.include", '/ingredients')
    })

    it('should auth user make an order', ()=> {
        cy.visit('/login');
        cy.get('input[name="email"]').type('axlstarxx@gmail.com').should('have.value', 'axlstarxx@gmail.com')
        cy.get('input[name="password"]').type('12345').should('have.value', '12345')
        cy.get('button').click()
        cy.url().should("not.include", '/login')
        
        cy.get('div[id="Булки"]').find('li').first().as('testedBun')
        cy.get('div[id="Соусы"]').find('li').first().as('testedSauce')
        cy.get('div[id="Начинки"]').find('li').first().as('testedMain')

        const dataTransfer = new DataTransfer();
        cy.get('@testedBun').find('img').as('bun')
        cy.get('@testedSauce').find('img').as('sauce')
        cy.get('@testedMain').find('img').as('main')


        cy.get('section').last().as('dropSection')

        cy.get('@bun').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });
        cy.get('@testedBun').find("[class^=counter__num]").should('contain', 2)

        cy.get('@sauce').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });


        cy.get('@testedSauce').find("[class^=counter__num]").should('contain', 1)


        cy.get('@main').trigger('dragstart', {
            dataTransfer
        })
        cy.get('@dropSection').trigger('drop', {
            dataTransfer
        });
        cy.get('@testedMain').find("[class^=counter__num]").should('contain', 1)

        cy.get('@dropSection').find('ul').as('mainList')
        cy.get('@mainList').children().should('have.length', 2)

        cy.get("button").contains('Оформить заказ').click()
        cy.contains('идентификатор заказа')
        cy.get('button').last().click()
        cy.contains('идентификатор заказа').should('not.exist')
    })
})