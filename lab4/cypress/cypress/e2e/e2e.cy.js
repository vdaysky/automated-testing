describe('Registration Test', () => {
    it('should register a new user and display a welcome message', () => {
 
        cy.visit('http://demo-store.seleniumacademy.com/customer/account/create/');

 
        const firstName = `First${Math.random().toString(36).substring(2, 7)}`;
        const middleName = `Middle${Math.random().toString(36).substring(2, 7)}`;
        const lastName = `Last${Math.random().toString(36).substring(2, 7)}`;
        const email = `${Math.random().toString(36).substring(2, 7)}@example.com`;
        const password = 'Password123';

 
        cy.get('#firstname').type(firstName);
        cy.get('#middlename').type(middleName);
        cy.get('#lastname').type(lastName);
        cy.get('#email_address').type(email);
        cy.get('#password').type(password);
        cy.get('#confirmation').type(password);

 
        cy.get('#form-validate').submit();

 
        cy.reload();

 
        cy.get('.welcome-msg').should('contain.text', `Welcome, ${firstName} ${middleName} ${lastName}!`);
    });
});

describe('Menu hover test', () => {
    it('should add menu-active class on hover', () => {
 
        cy.visit('http://demo-store.seleniumacademy.com/');


 
        cy.get('a.level0.has-children[href="http://demo-store.seleniumacademy.com/men.html"]')
            .parent('li')
            .should('not.have.class', 'menu-active');

 
        cy.get('a.level0.has-children[href="http://demo-store.seleniumacademy.com/men.html"]')
            .trigger('mouseover');

 
        cy.get('a.level0.has-children[href="http://demo-store.seleniumacademy.com/men.html"]')
            .parent('li')
            .should('have.class', 'menu-active');
    });
});

describe('Navigation links test', () => {
    const expectedUrls = [
        'http://demo-store.seleniumacademy.com/women.html',
        'http://demo-store.seleniumacademy.com/men.html',
        'http://demo-store.seleniumacademy.com/accessories.html',
        'http://demo-store.seleniumacademy.com/home-decor.html',
        'http://demo-store.seleniumacademy.com/sale.html',
        'http://demo-store.seleniumacademy.com/vip.html'
    ];

    it('should navigate to the correct URLs when clicking top-level links', () => {
 
        cy.visit('http://demo-store.seleniumacademy.com/');

 
        for (let i = 0; i < expectedUrls.length; i++) {
 
            cy.get('ol.nav-primary > li')
                .eq(i) 
                .find('a') 
                .first() 
                .click(); 

 
            cy.url().should('eq', expectedUrls[i]);

 
            cy.visit('http://demo-store.seleniumacademy.com/');
        }
    });
});