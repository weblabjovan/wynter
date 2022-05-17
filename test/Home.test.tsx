import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { appRender } from "./app-render";
import Home from "../pages/index";

beforeAll(() => {
  appRender(<Home />);
});

test("shows correct Sign in page", async () => {
  expect(
    await screen.findByText("Welcome to Frontend task")
  ).toBeInTheDocument();
  expect(
    await screen.findByText("Sign in to see the products")
  ).toBeInTheDocument();
  expect(screen.getByTestId("buttonDiv")).toBeInTheDocument();
  expect(screen.getByTestId("buttonDiv")).toHaveProperty("id", "buttonDiv");
});
