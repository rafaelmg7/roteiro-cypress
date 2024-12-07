describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
    .type('Roteiro prático de Cypress - ES{enter}')
    .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .dblclick()
      .type(' - TP2 de ES{enter}');

      cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2) 
      .first()
      .should('have.text', 'Roteiro prático de Cypress - ES - TP2 de ES');
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Roteiro prático de Cypress - ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.toggle-all-label')
      .click();

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .should('be.checked');
  });

  it('Deleta todas as tarefas completas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Roteiro prático de Cypress - ES{enter}')
      .type('Prova de ES{enter}')
      .type('TP2 de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('.clear-completed')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)
      .first()
      .should('have.text', 'Prova de ES');
  });
});