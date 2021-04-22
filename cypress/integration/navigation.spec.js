const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

beforeEach(() => {
  cy.visit("/");
})

describe("Navigation", () => {
  it("should visit root", () => {
  });
  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  })
});