describe("Login Test", () => {
    it("Logs in successfully", () => {
      cy.visit("/login");              // open login page
      cy.get("[data-cy=email]").type("user@test.com");
      cy.get("[data-cy=password]").type("password123");
      cy.get("[data-cy=login-button]").click();
  
      cy.url().should("include", "/dashboard");  // check page changed
      cy.contains("Dashboard").should("be.visible");  // check dashboard text
    });
  });
  
  describe("Dashboard Access", () => {
    beforeEach(() => {
      cy.login("user@test.com", "password123");  // log in via API
      cy.visit("/dashboard");                     // navigate to dashboard
    });
  
    it("Loads dashboard data", () => {
      cy.intercept("GET", "/api/dashboard").as("dashboard");  // watch the API
      cy.wait("@dashboard").its("response.statusCode").should("eq", 200);  // check API success
  
      cy.contains("Welcome").should("be.visible");           // UI validation
      cy.get("[data-cy=dashboard-widget]").should("exist");  // optional extra checks
    });
  });
  