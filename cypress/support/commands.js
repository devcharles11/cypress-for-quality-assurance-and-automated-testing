// cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
    cy.request({
      method: "POST",
      url: "/api/login",     // your backend login API
      body: { email, password },
    }).then((resp) => {
      window.localStorage.setItem("authToken", resp.body.token); // store auth token
    });
  });
  