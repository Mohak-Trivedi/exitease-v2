describe("Backend API Tests for Employee and Admin Role", () => {
  const apiUrl = "http://localhost:8080/api";
  let employeeResignationId = null; // Store the resignation ID for approval
  let employeeUsername = `emp_${Date.now()}`; // Generate a unique username
  const employeePassword = "emp4"; // Use the same password for registration and login

  // Employee registration and login
  it("should register a new employee", () => {
    cy.request("POST", `${apiUrl}/auth/register`, {
      username: employeeUsername, // Use the dynamically generated username
      password: employeePassword,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "message",
        "User registered successfully"
      );
    });
  });

  it("should login the employee with valid credentials", () => {
    cy.request("POST", `${apiUrl}/auth/login`, {
      username: employeeUsername, // Use the same username as registration
      password: employeePassword, // Use the same password as registration
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      Cypress.env("employeeAuthToken", response.body.token); // Store token in Cypress environment variable
    });
  });

  it("should submit resignation for an employee", function () {
    const token = Cypress.env("employeeAuthToken"); // Retrieve token from Cypress environment variable
    cy.request({
      method: "POST",
      url: `${apiUrl}/user/resign`,
      headers: {
        Authorization: `${token}`,
      },
      body: {
        lwd: "2024-12-26",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      employeeResignationId = response.body.data.resignation._id; // Store resignation ID for approval
    });
  });

  // Admin Login and Admin Operations
  it("should login as admin (HR)", () => {
    cy.request("POST", `${apiUrl}/auth/login`, {
      username: "admin",
      password: "admin",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      Cypress.env("adminAuthToken", response.body.token); // Store admin token in Cypress environment variable
    });
  });

  it("should view all resignations submitted by employees as admin", function () {
    const token = Cypress.env("adminAuthToken"); // Retrieve admin token from Cypress environment variable
    cy.request({
      method: "GET",
      url: `${apiUrl}/admin/resignations`,
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");
    });
  });

  it("should approve the employee’s resignation as admin", function () {
    const token = Cypress.env("adminAuthToken"); // Retrieve admin token from Cypress environment variable
    cy.request({
      method: "PUT",
      url: `${apiUrl}/admin/conclude_resignation`,
      headers: {
        Authorization: `${token}`,
      },
      body: {
        resignationId: employeeResignationId,
        approved: true,
        lwd: "26 Dec 2024",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Employee completes the questionnaire after resignation approval
  it("should allow the employee to submit responses to exit questionnaire", function () {
    const token = Cypress.env("employeeAuthToken"); // Retrieve employee token from Cypress environment variable
    cy.request({
      method: "POST",
      url: `${apiUrl}/user/responses`,
      headers: {
        Authorization: `${token}`,
      },
      body: {
        responses: [
          {
            questionText: "What prompted you to start looking for another job?",
            response: "Lack of career growth opportunities",
          },
          {
            questionText: "Would you recommend this company to others?",
            response: "Yes, with some reservations",
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Admin views the questionnaire responses
  it("should allow the admin to view all questionnaire responses", function () {
    const token = Cypress.env("adminAuthToken"); // Retrieve admin token from Cypress environment variable
    cy.request({
      method: "GET",
      url: `${apiUrl}/admin/exit_responses`,
      headers: {
        Authorization: `${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an("array");

      // Find the specific response data that matches the expected responses
      const expectedResponses = [
        {
          questionText: "What prompted you to start looking for another job?",
          response: "Lack of career growth opportunities",
        },
        {
          questionText: "Would you recommend this company to others?",
          response: "Yes, with some reservations",
        },
      ];

      // Check if any of the data array includes the expected responses
      const hasExpectedResponses = response.body.data.some((item) => {
        return (
          item.responses.length === expectedResponses.length &&
          item.responses.every((resp, index) => {
            return (
              resp.questionText === expectedResponses[index].questionText &&
              resp.response === expectedResponses[index].response
            );
          })
        );
      });

      // Assert that the expected responses exist in the data
      expect(hasExpectedResponses).to.be.true;
    });
  });
});
