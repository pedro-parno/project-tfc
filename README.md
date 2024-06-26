## Trybe Futebol Club


![Intro gif](./app/project-gif/Screencast%20from%2002-05-2024%2013_10_44.gif)


<br />

<!-- Índice -->
<details>
  <summary>Índice</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre o projeto</a>
      <ul>
        <li><a href="#built-with">Construído com</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Como rodar o projeto</a>
      <ul>
        <li><a href="prerequisites">Pré requisitos</a></li>
        <li><a href="#installation">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#roadmap">Próximos passos</a></li>
  </ol>
</details>



<!-- Sobre o projeto -->
## About The Project

O TFC é uma plataforma informativa que oferece atualizações sobre partidas e classificações de futebol. Este projeto envolve a criação de uma API robusta e a integração de aplicações utilizando docker-compose, operando em harmonia com um banco de dados. Todo o front-end já estava pronto.

<p align="right">(<a href="#readme-top">índice</a>)</p>

### Construído com

<div>
  <img src="https://img.shields.io/badge/TypeScript-00000F?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/docker-00000F?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/sequelize-00000F?style=for-the-badge&logo=sequelize&logoColor=blue"/>
  <img src="https://img.shields.io/badge/json%20web%20tokens-00000F?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/>
</div>

<p align="right">(<a href="#readme-top">índice</a>)</p>

<!-- Como rodar o projeto -->
## Como rodar o projeto

Se nenhuma configuração for modificada, após realizar os passos abaixo, o site estará rodando no `http://localhost:3000/leaderboard`. Verifique antes se há outra aplicação rodando nas portas padrões, neste projeto o backend e o frontend estão rodando nas respectivas portas, 3001 e 3000.

### pré-requisitos:

  * `Node` deve ter versão igual ou superior à `16.14.0`.
  * `Docker Compose` deve ter a versão igual ou superior à `2.5`

### instalação:

* Front e Back possuem suas próprias dependências:
  * você pode instalá-las ambas rodando o comando, na raiz do projeto `npm run install:apps`.
  * ou utilizando `npm install` dentro de cada diretório.

* Para subir e derrubar todos os containers respectivamente.
  * `npm run compose:up` | `npm run compose:down`

<p align="right">(<a href="#readme-top">índice</a>)</p>

<!-- Próximos passos -->
## Pŕoximos passos

- Correção de testes que falharam.
- 100% cobertura de testes.

<p align="right">(<a href="#readme-top">índice</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Conclusão

Neste projeto pude por em prática tudo o que aprendi no módulo de back-end na Trybe. Desde a configuração do Docker, paasando por MySQL, configurando as migrations pelo Sequelize, criação do CRUD, autenticação com Json web token, e por final usando as classes do TypeScript.

<p align="right">(<a href="#readme-top">índice</a>)</p>
