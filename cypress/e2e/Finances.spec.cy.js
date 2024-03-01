/// <reference types="cypress"/>

import { format, prepareLocalStorage } from '../support/utils'


context('Dev Finances', () => {

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#c', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        })
    });

    it('Cadastrar entradas', () => {
    
        cy.get('#transaction .button').click()  //seleção por id + classe
        cy.get('#description').type('Salario')  //seleção por id
        cy.get('[name=amount]').type(1500); //seleção por atributos
        cy.get('[type=date]').type('2021-03-17'); //seleção por atributos
        cy.get('button').contains('Salvar').click(); //seleção por tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 3);
    });

    it('Cadastrar Saidas', () => {
        
        cy.get('#transaction .button').click()  
        cy.get('#description').type('Compras')  
        cy.get('[name=amount]').type(-100); 
        cy.get('[type=date]').type('2021-03-17'); 
        cy.get('button').contains('Salvar').click(); 

        cy.get('#data-table tbody tr').should('have.length', 3);
    });

   
    it('Remover entradas e saídas', () => {
        
        cy.get('#transaction .button').click()  
        cy.get('#description').type('Salario')  
        cy.get('[name=amount]').type(1500); 
        cy.get('[type=date]').type('2021-03-17'); 
        cy.get('button').contains('Salvar').click(); 

        cy.get('#transaction .button').click()  
        cy.get('#description').type('Compras')  
        cy.get('[name=amount]').type(-300); 
        cy.get('[type=date]').type('2021-03-17'); 
        cy.get('button').contains('Salvar').click(); 

        // exclusão retornando para o elemento pai e avançando para um td img atribuido a ele
        cy.get('td.description')
            .contains('Salario')
            .parent()
            .find('img[onclick*=remove]')
            .click()


        // buscar elementos irmãos, e buscar o que tem img + attr
        cy.get('td.description')
            .contains('Compras')
            .siblings()
            .children('img[onclick*=remove]')
            .click()
    });


    it('Validar saldo com transações', () => {
  
        // capturar as linhas com as transações e formatar os valores
        let incomes = 0 
        let expenses = 0
        
        cy.get('#data-table tbody tr')
            .each(($el, index, $list) => {
                cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
                        if(text.includes('-')){
                            expenses = expenses + format(text)
                        } else {
                            incomes = incomes + format(text)
                        }
                    })
            })

        // capturar o texto do total e comparar os valores de entradas e despesas com o total
        cy.get('#totalDisplay').invoke('text').then(text => {
            let formattedTotalDisplay = format (text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })
    });


});