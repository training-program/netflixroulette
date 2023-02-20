describe('root path verify', () => {
  beforeEach(() => cy.visit('http://localhost:8080'));

  it('default movies results count equal 15', () => {
    cy.getByData('movie-card').should('have.length', 15);
  });

  it('search result correct', () => {
    cy.getByData('search-input').type('interstellar');
    cy.getByData('search-button').click();
    cy.getByData('movie-card').should('have.length', 1);
    cy.getByData('movie-card').contains('Interstellar');
  });

  it('click movie opens correct view', () => {
    cy.getByData('search-input').type('Avatar');
    cy.getByData('search-button').click();
    cy.getByData('movie-card').contains('Avatar').click();
    cy.getByData('movie-info-title').contains('Avatar');
    cy.getByData('movie-info-vote').contains('7.5');
    cy.getByData('movie-info-genre-line').contains(
      'Action & Adventure & Fantasy & Science Fiction',
    );
    cy.getByData('movie-info-year').contains('2009');
    cy.getByData('movie-info-duration').contains('2h 42min');
    cy.getByData('movie-info-overview').contains('Pandora');
  });
});
