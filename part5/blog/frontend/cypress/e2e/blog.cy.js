describe('template spec', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'root',
      name: 'superuser',
      password: 'secret',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('secret');
      cy.get('#login-button').click();

      cy.contains('superuser logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'secret' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('new title');
      cy.get('#author').type('new author');
      cy.get('#url').type('new url');
      cy.get('#new-blog-button').click();

      cy.contains('new title new author');
    });

    describe('when blogs already exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' });
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' });
      });

      it('blog can be liked', function () {
        cy.contains('title1 author1')
          .contains('view')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click();

        cy.contains('title1 author1').parent().contains('like 1');
      });

      it('blog can be deleted', function () {
        cy.contains('title1 author1')
          .contains('view')
          .click()
          .parent()
          .parent()
          .contains('remove')
          .click();

        cy.get('html').should('not.contain', 'title1 author1');
      });

      it('remove button shows only for user who created the blog', function () {
        cy.contains('title1 author1').contains('view').click().parent().parent().contains('remove');
      });

      it.only('blogs are ordered according to likes', function () {
        cy.contains('title2 author2')
          .contains('view')
          .click()
          .parent()
          .parent()
          .contains('like')
          .click()
          .click()
          .click();

        cy.get('.blog').eq(0).should('contain', 'title2 author2');
        cy.get('.blog').eq(1).should('contain', 'title1 author1');
      });
    });
  });
});
