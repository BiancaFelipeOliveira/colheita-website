# 🌱 API Colheita
<img width="1920" height="1080" alt="Green Illustrative Agriculture Presentation" src="https://github.com/user-attachments/assets/ab1beb7b-2178-49e6-87b4-2518b9643540" />

## Sobre o Projeto

A **Colheita** é uma aplicação voltada para **conectar produtores locais a consumidores**, promovendo a **economia local** e facilitando o acesso a **alimentos frescos e saudáveis**.

Atualmente, o projeto conta não apenas com a **API**, mas também com um **site integrado**, que consome a API e permite o gerenciamento visual e intuitivo de **produtores** e **produtos**.

---

## Objetivo

O objetivo do projeto é disponibilizar uma solução completa que permita:

* Cadastro e gerenciamento de **produtores locais**;
* Cadastro e gerenciamento de **produtos**;
* Integração entre **front-end (site)** e **back-end (API)**;
* Valorização do comércio local e da interação comunitária.

---

## Funcionalidades

A API realiza operações **CRUD** (*Create, Read, Update e Delete*) para os seguintes recursos:

### 👩‍🌾 Produtores

* **Cadastrar produtor**
* **Listar produtores**
* **Atualizar informações do produtor**
* **Excluir produtor**

### 🥕 Produtos

* **Cadastrar produto**
* **Listar produtos**
* **Atualizar informações do produto**
* **Excluir produto**

---

## Funcionamento do Site

O site foi desenvolvido para facilitar a interação com a API, permitindo que qualquer pessoa consiga utilizar o sistema de forma prática.


![gravacao-tel (2) (online-video-cutter com)](https://github.com/user-attachments/assets/b7ac8894-640b-43f9-bb42-83572ed418f6)


### Fluxo de uso – Produtores

1. **Cadastrar Produtor**

   * Preencha o formulário com as informações do produtor;
   * Clique em **Salvar**;
   * O produtor será cadastrado e exibido imediatamente em forma de **card** na tela.

2. **Atualizar Produtor**

   * Clique no **card do produtor** que deseja editar;
   * As informações serão preenchidas automaticamente no formulário;
   * Edite os campos desejados;
   * Clique em **Alterar** para salvar as mudanças.

3. **Excluir Produtor**

   * Clique no **card do produtor**;
   * Selecione a opção **Excluir**.

### Fluxo de uso – Produtos

O funcionamento dos **produtos segue exatamente a mesma lógica**:

* Cadastro via formulário;
* Exibição em cards;
* Clique no card para **editar** ou **excluir**.

---

## Executando o Projeto com GitHub Codespaces

Para utilizar **tanto a API quanto o site**, siga os passos abaixo:

1. Clique no botão **Code** (verde) no repositório.
2. Selecione **Codespaces** → **New Codespace**.
3. Quando o Codespace abrir, abra o **terminal**.
4. Instale as dependências do projeto:

```bash
npm install
```

5. Inicie o servidor:

```bash
npm run dev
```

6. Acesse o projeto no navegador:

```bash
http://localhost:3000
```

---

## Endpoints da API

### 📦 Produtos

* `GET /api/products` – listar produtos
* `POST /api/products` – cadastrar produto
* `PUT /api/products/:id` – atualizar produto
* `DELETE /api/products/:id` – excluir produto

### 👩‍🌾 Produtores

* `GET /api/producers` – listar produtores
* `POST /api/producers` – cadastrar produtor
* `PUT /api/producers/:id` – atualizar produtor
* `DELETE /api/producers/:id` – excluir produtor

---

## Testes via Terminal (Opcional)

### Cadastrar um produto

```bash
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{"name": "Tomate", "category": "Alimentos", "price": 5.50, "description":"Tomates Orgânicos da Fazenda do Sol", "quantity": 3, "producerId": 1}'
```

### Cadastrar um produtor

```bash
curl -X POST http://localhost:3000/api/producers \
-H "Content-Type: application/json" \
-d '{"name": "Fazenda do Sol", "location": "Cidade XYZ", "phone": "11923321909"}'
```

---

## Desenvolvedoras

* **Ana Catarina Mezzalira Romanosk Ribeiro** – Desenvolvimento da API.
* **Bianca Felipe de Oliveira** – Desenvolvimento do front-end e integração com a API.

---

## Contexto Acadêmico

Projeto desenvolvido para o **Projeto de Extensão** da disciplina **Web Services**, ministrada pelo professor **Victor de Moura Indalécio**.

---

## Licença

Projeto desenvolvido para fins **acadêmicos e de aprendizado**.
Pode ser estudado, adaptado e evoluído por outros estudantes, desde que os devidos créditos sejam mantidos.

