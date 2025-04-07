import "../support/commands";

describe("Aplicação de Tarefas - E2E", () => {
  const user = {
    name: "Test user",
    email: "teste@teste.com",
    username: "testuser",
    password: "senha@123",
  };

  beforeEach(() => {
    cy.visit("http://localhost:3001/login");
  });

  it("Registro de usuário", () => {
    cy.contains("Registrar").click();
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.contains("Cadastrar").click();
  });

  it("Login com sucesso", () => {
    cy.contains("Entrar").click();
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.contains("Entrar").click();
    cy.contains("Tarefas adicionadas").should("exist");
  });

  // it("Criação de nova tarefa", () => {
  //   cy.contains("Criar Tarefa").click();
  //   cy.get('input[name="title"]').type("Minha tarefa E2E");
  //   cy.get('textarea[name="description"]').type("Descrição da tarefa");
  //   cy.contains("Salvar").click();
  //   cy.contains("Minha tarefa E2E").should("exist");
  // });

  // it("Marcar tarefa como concluída", () => {
  //   cy.contains("Minha tarefa E2E")
  //     .parent()
  //     .within(() => {
  //       cy.contains("Concluir tarefa").click();
  //     });
  //   cy.contains("Concluída").should("exist");
  // });

  // it("Exclusão de tarefa", () => {
  //   cy.contains("Minha tarefa E2E")
  //     .parent()
  //     .within(() => {
  //       cy.contains("Deletar tarefa").click();
  //     });
  //   cy.contains("Minha tarefa E2E").should("not.exist");
  // });

  // it("Filtro por status", () => {
  //   cy.get("select").select("pendente");
  //   cy.get("table tbody tr").each(($el) => {
  //     cy.wrap($el).contains("Pendente");
  //   });
  //   cy.get("select").select("concluída");
  //   cy.get("table tbody tr").each(($el) => {
  //     cy.wrap($el).contains("Concluída");
  //   });
  // });

  // it("Bloqueio de rotas privadas sem autenticação", () => {
  //   cy.clearCookies();
  //   cy.visit("http://localhost:3000/dashboard");
  //   cy.url().should("include", "/login");
  // });

  // it("Validações de formulário", () => {
  //   cy.contains("Criar Tarefa").click();
  //   cy.contains("Salvar").click();
  //   cy.contains("Título é obrigatório").should("exist");
  //   cy.contains("Descrição é obrigatória").should("exist");
  // });
});
