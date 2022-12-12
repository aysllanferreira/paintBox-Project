# Boas-vindas ao repositório do exercício de paintBox Project!
Este projeto foi desenvolvido por Aysllan Ferreira, enquanto estudante na Trybe para servir como material de apoio para as pessoas estudantes se prepararem para o projeto Pixel Art.

# Orientações
	
<details>
<summary><strong>‼ Antes de começar a desenvolver</strong></summary><br />

1. Clone o repositório

	*  Use o comando: `git@github.com:aysllanferreira/paintBox-Project.git`

* Entre na pasta do repositório que você acabou de clonar:

	*  `cd paintBox-Project`

2. Instale as dependências

	* Para isso, use o seguinte comando: `npm install`
	
</details>

<details>
<summary><strong>🎛 Linter</strong></summary><br />

Para simular um ambiente real de projeto, nós usaremos o [ESLint](https://eslint.org/) para fazer a análise do código.
	
</details>

<details>
<summary><strong>🛠 Testes</strong></summary><br />

Para os testes serem realizados com exito, certifique-se que a versão do seu node seja de fato a versão 16.

```bash
node -v
```

Caso você esteja utilizando outra versão, você pode usar este comando para alterar sua versão para 16.

```bash
nvm use 16
```

Todos os requisitos serão testados pelo Cypress. Para rodar todos os testes, basta rodar no terminal o comando.

```bash
npx cypress open
ou
npx cypress run
```
</details>

<br>

### Boa sorte!!!
<br>

# Requisitos Obrigatórios

## 1. Implementa o `Header` de sua pagina.

<details>
  <summary>
  Crie um Header para sua página.
  </summary> <br />

- Dentro da div com o ID: app, crie um `header`.
- Dentro do seu header, crie um elemento com a tag `h1`.
- O texto do seu H1 deve ser: `Paint Box`.

**O que será testado:**

- Sua página deve conter um elemento com a tag Header como filho da div com o id app.

- Sua página deve conter um elemento h1 com o texto Paint Box como filho do elemento header.

</details><br>

## 2. Crie os elementos de sua `Paleta de cores`.

<details>
  <summary>
  Implemente sua página criando elementos que futuramente receberá 
  </summary> <br />

- Crie uma `div` que seja filhas do elemento com id: `app`.
- Essa div deve conter o id: `pallete`.
- Crie 4 `div` que sejam filhas do elemento que contenha o id `pallete`.
- Essas divs devem conter a classe `color`.
- Essas divs devem conter uma `borda solida preta de 1px`.
- Essas divs devem conter `50px de altura`.
- Essas divs devem conter `50px de largura`.
- A segunda e a última div deve conter um `border-radius` de 50%.

**O que será testado:**

- Deverá conter uma `div` com o id `pallete` que seja filho do elemento `app`.
- Deverá haver 4 divs com a classe `color`.
- Elas devem ter uma `borda solida preta de 1px`.
- Essas divs devem conter `50px de altura e largura`.
- A segunda e a última div deve conter um `border-radius` de 50%.

</details><br>