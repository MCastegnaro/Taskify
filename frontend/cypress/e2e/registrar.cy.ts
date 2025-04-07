import "../support/commands";
import "../support/e2e";

const user = {
  name: "Test user",
  email: "teste@teste.com",
  username: "testuser",
  password: "senha@123",
};

describe("Aplicação de Tarefas - E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/login");

    cy.intercept("POST", "/auth/login", {
      fixture: "register.json",
    }).as("postRegister");
  });

  it("Validar botão desabilitado", () => {
    cy.contains("Registrar").click();
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get("button").contains("Cadastrar").should("be.enabled");
  });

  it("Validações de formulário", () => {
    cy.contains("Registrar").click();

    cy.get('input[name="name"]').type(user.name).clear();
    cy.get('input[name="email"]').type(user.email).clear();
    cy.get('input[name="username"]').type(user.username).clear();
    cy.get('input[name="password"]').type(user.password).clear();

    cy.get(".text-sm.text-red-500").should("exist");
    cy.get(".space-y-4 > .bg-blue-800").should("be.disabled");
  });

  it("Navegar para cadastro", () => {
    cy.contains("Registrar-se").click();
    cy.url().should("include", "/register");
  });

  it("Navegar para login", () => {
    cy.contains("Registrar-se").click();
    cy.url().should("include", "/register");
    cy.contains("voltar").click();
    cy.url().should("include", "/login");
  });

  it("Registro de usuário", () => {
    cy.contains("Registrar").click();
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.contains("Cadastrar").click();
  });
});
