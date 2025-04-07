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

    cy.intercept(
      "PATCH",
      "**/tasks/0b67f645-76bd-4b7d-be68-bdf234ab0de0/complete",
      {
        statusCode: 204,
        body: {},
      },
    ).as("completeTask");
  });

  it("Editar titulo da tarefa", () => {
    login();

    cy.wait("@getTasks").its("response.statusCode").should("eq", 200);
    cy.contains("Minha tarefa E2E").should("exist");

    cy.get("tbody > :nth-child(1) > .justify-center")
      .find(".button-complete")
      .click();
    cy.get('[data-cy="dropdown-edit"]').click();

    cy.get(".mb-4").should("be.exist").contains("Editar Tarefa");
    cy.get('input[name="title"]').should("have.value", "Minha tarefa E2E");

    cy.get('input[name="title"]').click().clear().type("Título editado");

    cy.get(".space-y-4 > .bg-blue-800").click();

    cy.get(".mb-4").should("not.exist");

    cy.wait("@getTasks").its("response.statusCode").should("eq", 200);
  });

  //  it("Exclusão de tarefa", () => {
  //   cy.contains("Minha tarefa E2E")
  //     .parent()
  //     .within(() => {
  //       cy.contains("Deletar tarefa").click();
  //     });
  //   cy.contains("Minha tarefa E2E").should("not.exist");
  // });

  // it("Marcar tarefa como concluída", () => {
  //   login();

  //   cy.wait("@getTasks").its("response.statusCode").should("eq", 200);
  //   cy.contains("Minha tarefa E2E").should("exist");

  //   cy.get("tbody > :nth-child(1) > .justify-center")
  //     .find(".button-complete")
  //     .click();
  //   cy.get('[data-cy="dropdown-complete"]').click();

  //   cy.wait("@completeTasks").its("response.statusCode").should("eq", 204);
  //   cy.wait("@getTasks").its("response.statusCode").should("eq", 200);
  //   cy.get("tbody > :nth-child(1) > :nth-child(3)")
  //     .contains("Concluída")
  //     .should("exist");
  // });

  // it("Filtro por status", () => {
  //   login();
  //   cy.contains("Minha tarefa E2E").should("exist");
  //   cy.get("select").select("pendente");
  //   cy.get("table tbody tr").each(($el) => {
  //     cy.wrap($el).contains("Pendente");
  //   });
  //   cy.get("select").select("pendente");
  //   cy.get("table tbody tr").each(($el) => {
  //     cy.wrap($el).contains("Concluída");
  //   });
  // });
});
