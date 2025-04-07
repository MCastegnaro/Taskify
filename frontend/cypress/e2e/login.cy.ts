import "../support/commands";
import "../support/e2e";

const user = {
  name: "Test user",
  email: "teste@teste.com",
  username: "testuser",
  password: "senha@123",
};

const login = () => {
  cy.get('input[name="username"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
  cy.contains("Entrar").click();
  cy.wait("@postLogin").its("response.statusCode").should("eq", 200);
  cy.wait("@getTasks").its("response.statusCode").should("eq", 200);
};

describe("Aplicação de Tarefas - E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/login");

    cy.intercept("POST", "/auth/login", {
      fixture: "login.json",
    }).as("postLogin");

    cy.intercept(
      "GET",
      "/tasks?page=1&limit=5&orderBy=title&orderDirection=ASC",
      {
        fixture: "task_list.json",
      },
    ).as("getTasks");
  });

  it("Validações de formulário", () => {
    cy.get('input[name="username"]').type(user.email).clear();
    cy.get('input[name="password"]').type(user.password).clear();
    cy.get(".text-sm.text-red-500").should("exist");
    cy.get(".space-y-4 > .bg-blue-800").should("be.disabled");
  });

  it("Navegação de link - Registrar-se", () => {
    cy.contains("Registrar-se").click();
    cy.url().should("include", "/register");
  });

  it("Login com sucesso", () => {
    login();
    cy.contains("Tarefas adicionadas").should("exist");
  });

  it("Bloqueio de rotas privadas sem autenticação", () => {
    cy.clearCookies();
    cy.visit("http://localhost:3001/tasks");
    cy.url().should("include", "/login");
  });
});
