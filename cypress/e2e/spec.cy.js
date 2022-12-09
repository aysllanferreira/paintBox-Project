describe('Testa o Header', () => {
  it('Verifica se tem o Header como filho da div com o id App', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app').should('be.visible');
    cy.get('#app > header').should('be.visible');
  });

  it('Verifica se o Header possui um h1 com o texto Paint Box', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > header > h1').should('have.text', 'Paint Box');
  });
});

describe('Testa as formas geometricas', () => {
  it('Verifica se tem os pallete como filho da div com o id App', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app').should('be.visible');
    cy.get('#app > #pallete').should('be.visible');
  });

  it('Verifica se os pallete tem 4 divs filhas', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete').children().should('have.length', 4);
  });

  it('Verifica se as 4 divs filhas dos pallete tem a classe color', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').should('have.length', 4);
  });

  it('Verifica se as 4 divs filhas dos pallete tem a classe color e se tem a borda preta', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').should('have.css', 'border', '1px solid rgb(0, 0, 0)');
  });

  it('Verifica se a primeira e terceira div sao quadradas com 50px de altura e largura', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').eq(0).should('have.css', 'width', '50px');
    cy.get('#app > #pallete > .color').eq(0).should('have.css', 'height', '50px');
    cy.get('#app > #pallete > .color').eq(2).should('have.css', 'width', '50px');
    cy.get('#app > #pallete > .color').eq(2).should('have.css', 'height', '50px');
  });

  it('Verifica se a segunda e quarta div sao circulares com 50px de altura e largura', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').eq(1).should('have.css', 'width', '50px');
    cy.get('#app > #pallete > .color').eq(1).should('have.css', 'height', '50px');
    cy.get('#app > #pallete > .color').eq(1).should('have.css', 'border-radius', '50%');
    cy.get('#app > #pallete > .color').eq(3).should('have.css', 'width', '50px');
    cy.get('#app > #pallete > .color').eq(3).should('have.css', 'height', '50px');
    cy.get('#app > #pallete > .color').eq(3).should('have.css', 'border-radius', '50%');
  });
});

describe('Verifica se as formas Geometricas usam FlexBox', () => {
  it('Verifica se os pallete tem a propriedade display flex', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete').should('have.css', 'display', 'flex');
  });

  it('Verifica se os pallete tem a propriedade flex-direction row', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete').should('have.css', 'flex-direction', 'row');
  });

  it('Verifica se os pallete estao no centro da tela', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete').should('have.css', 'justify-content', 'center');
  });
});

describe('Verifica se as formas geometricas possuem cores distintas', () => {
  it('Verifica se todas as formas geometricas possuem cores definidas', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').each(($el) => {
      cy.wrap($el).should('have.css', 'background-color');
    });
  });

  it('Verifica se todas as formas geometricas possuem cores diferente de branco', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').each(($el) => {
      cy.wrap($el).should('not.have.css', 'background-color', 'rgb(255, 255, 255)');
    });
  });

  it('Verifica se a ultima forma geometrica possui a cor preta', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').last().should('have.css', 'background-color', 'rgb(0, 0, 0)');
  });

  it('Verifica se a paleta nao possui cores repetidas', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').then((colors) => {
      const colorsArray = [...colors].map((color) => color.style.backgroundColor);
      const uniqueColors = [...new Set(colorsArray)];
      expect(colorsArray).to.have.lengthOf(uniqueColors.length);
    });
  });
});

describe('Verifica botao de gerar cores', () => {
  it('Verifica se o botao de gerar cores existe', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#new-colors').should('be.visible');
  });

  it('Verifica se o botao de gerar cores possui o texto "Gerar cores"', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#new-colors').should('have.text', 'Gerar cores');
  });

  it('Verifica se o pai do botao que possui o Texto Gerar Cores tem flexbox e esta no centro da tela', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#new-colors').parent().should('have.css', 'display', 'flex');
    cy.get('#new-colors').parent().should('have.css', 'justify-content', 'center');
  });

  it('Verifica se o botao ao ser clicado renderiza cores diferentes na paleta', () => {
    cy.visit('http://localhost:5173/');
    let saveMe;
    cy.get('#app > #pallete > .color').then((colors) => {
      const colorsArray = [...colors].map((color) => color.style.backgroundColor);
      cy.get('#new-colors').click();
      cy.get('#app > #pallete > .color').then((newColors) => {
        const newColorsArray = [...newColors].map((color) => color.style.backgroundColor);
        saveMe = newColorsArray;
        expect(colorsArray).to.not.deep.equal(newColorsArray);
        cy.get('#new-colors').click();
        cy.get('#app > #pallete > .color').then((newColors) => {
          const newColorsArray = [...newColors].map((color) => color.style.backgroundColor);
          expect(saveMe).to.not.deep.equal(newColorsArray);
        });
      });
    });
  });

  it('Verifica se o botao ao clicado, a ultima cor permanece preta', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#new-colors').click();
    cy.get('#app > #pallete > .color').last().should('have.css', 'background-color', 'rgb(0, 0, 0)');
  });
});

describe('Verifica o LocalStorage da paleta', () => {
  it('Verifica se a chave do LocalStorage tem o nome de colors', () => {
    cy.visit('http://localhost:5173/');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('colors')).to.be.a('string');
    });
  });

  it('Verifica se ao recarregar a pagina as cores geradas permanecem a mesma', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').then((colors) => {
      const colorsArray = [...colors].map((color) => color.style.backgroundColor);
      cy.reload();
      cy.get('#app > #pallete > .color').then((newColors) => {
        const newColorsArray = [...newColors].map((color) => color.style.backgroundColor);
        expect(colorsArray).to.deep.equal(newColorsArray);
      });
    });
  });

  it('Verifica se ao clicar no botao de gerar cores e recarregar a pagina, as cores permancem as mesmas', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#new-colors').click();
    cy.get('#app > #pallete > .color').then((colors) => {
      const colorsArray = [...colors].map((color) => color.style.backgroundColor);
      cy.reload();
      cy.get('#app > #pallete > .color').then((newColors) => {
        const newColorsArray = [...newColors].map((color) => color.style.backgroundColor);
        expect(colorsArray).to.deep.equal(newColorsArray);
      });
    });
  });
});

describe('Verifica se a classe Selected alterna entre a paleta', () => {
  it('Verifica se a classe Selected existe', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').first().should('have.class', 'selected');
  });

  it('Verifica se ao carregar a pagina, a primeira cor tem a classe selected e as outras nao tem', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').first().should('have.class', 'selected');
    cy.get('#app > #pallete > .color').first().siblings().should('not.have.class', 'selected');
  });

  it('Verifica se ao clicar em uma cor, a classe selected e adicionada a cor clicada e removida da cor anterior', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').first().should('have.class', 'selected');
    cy.get('#app > #pallete > .color').first().siblings().should('not.have.class', 'selected');
    cy.get('#app > #pallete > .color').eq(1).click();
    cy.get('#app > #pallete > .color').eq(1).should('have.class', 'selected');
    cy.get('#app > #pallete > .color').first().should('not.have.class', 'selected');
    cy.get('#app > #pallete > .color').eq(2).click();
    cy.get('#app > #pallete > .color').eq(2).should('have.class', 'selected');
    cy.get('#app > #pallete > .color').eq(1).should('not.have.class', 'selected');
  });
});

describe('Verifica o Board', () => {
  it('Verifica se a div com o id board existe', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #board').should('be.visible');
  });

  it('Verifica se o board tem 400px de largura e 200px de altura', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #board').should('have.css', 'width', '400px');
    cy.get('#app > #board').should('have.css', 'height', '200px');
  });

  it('Verifica se o board tem uma borda solida de 3px preta', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #board').should('have.css', 'border-style', 'solid');
    cy.get('#app > #board').should('have.css', 'border-width', '3px');
    cy.get('#app > #board').should('have.css', 'border-color', 'rgb(0, 0, 0)');
  });

  it('Verifica se o board possui inicialmente a cor de fundo branca', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #board').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});

describe('Verifica se ao selecionar uma cor da paleta e clicar no board, ele muda a cor de fundo corretamente', () => {
  it('Verifica se ao selecionar uma cor e clicar no board, o board muda de cor', () => {
    cy.visit('http://localhost:5173/');
    // Seleciona a cor preta
    cy.get('#app > #pallete > .color').last().click();
    // Clica no board
    cy.get('#app > #board').click();
    // Verifica se o board mudou de cor
    cy.get('#app > #board').should('have.css', 'background-color', 'rgb(0, 0, 0)');

    // Seleciona a segunda cor da paleta
    cy.get('#app > #pallete > .color').eq(1).click();
    // Clica no board
    cy.get('#app > #board').click();
    // Verifica se o board mudou de cor
    cy.get('#app > #board').should('not.have.css', 'background-color', 'rgb(0, 0, 0)');

    // Verifica se a cor nao e branca
    cy.get('#app > #board').should('not.have.css', 'background-color', 'rgb(255, 255, 255)');
  });
});

describe('Verifica o LocalStorage do Board', () => {
  it('Verifica se o LocalStorage possui a key board-color', () => {
    cy.visit('http://localhost:5173/');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('board-color')).to.not.be.null;
    });
  });

  it('Verifique se ao pintar o board com a cor preta, a cor permanece', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').last().click();
    cy.get('#app > #board').click();

    // Guarde numa variavel as cores do board
    cy.get('#app > #board').then((board) => {
      let boardColor = board[0].style.backgroundColor;
      if (boardColor === 'black' || boardColor === '#000000' || boardColor === '#000') {
        boardColor = 'rgb(0, 0, 0)';
      }
      cy.reload();
      cy.get('#app > #board').should('have.css', 'background-color', boardColor);
    });
  });

  it('Verifique se ao pintar o board com outras cores, a cor permanece', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#app > #pallete > .color').eq(1).click();
    cy.get('#app > #board').click();

    // Guarde numa variavel as cores do board
    cy.get('#app > #pallete > .color').eq(1).then((color) => {
      let colorSelected = color[0].style.backgroundColor;
      if (colorSelected === 'black' || colorSelected === '#000000' || colorSelected === '#000') {
        colorSelected = 'rgb(0, 0, 0)';
      }
      cy.reload();
      cy.get('#app > #board').should('have.css', 'background-color', colorSelected);
    });

    cy.get('#app > #pallete > .color').eq(2).click();
    cy.get('#app > #board').click();

    // Guarde numa variavel as cores do board
    cy.get('#app > #pallete > .color').eq(2).then((color) => {
      let colorSelected = color[0].style.backgroundColor;
      if (colorSelected === 'black' || colorSelected === '#000000' || colorSelected === '#000') {
        colorSelected = 'rgb(0, 0, 0)';
      }
      cy.reload();
      cy.get('#app > #board').should('have.css', 'background-color', colorSelected);
    });
  });
});
