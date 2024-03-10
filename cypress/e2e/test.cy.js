// import cy from 'cypress';
// import './commands'

describe('サインインテスト', () => {
    it('email入力でエラーになる', () =>  {
      cy.visit('http://localhost:3000/signin');
      cy.get('.signin-button').click()
      cy.get('.error-message').should('have.text', 'サインインに失敗しました。AxiosError: Request failed with status code 400')
    });
  });