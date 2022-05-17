import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { appRender } from "./app-render";
import Products from "../pages/products";
import { server } from "./server";
import encode from "jwt-encode";

beforeEach(() => {
  server.listen();
  const token = encode(
    {
      exp: Math.round(Date.now() + 1000),
    },
    "secret"
  );
  localStorage.setItem("wynterToken", token);
  appRender(<Products />);
});

afterEach(() => {
  localStorage.removeItem("wynterToken");
});

test("shows correct Products page", async () => {
  expect(await screen.findByText("Products")).toBeInTheDocument();
  expect(
    await screen.findByPlaceholderText("Search by name")
  ).toBeInTheDocument();
  expect(await screen.findByText("Unfeatured products")).toBeInTheDocument();
  expect(await screen.findByText("Testname2")).toBeInTheDocument();
  expect(await screen.findByText("Testname3")).toBeInTheDocument();
});

test("filters the products throught search", async () => {
  userEvent.type(
    await screen.findByPlaceholderText("Search by name"),
    "Testname2"
  );
  expect(await screen.findByText("Testname2")).toBeInTheDocument();
  expect(await screen.findByText("Test description 2")).toBeInTheDocument();
  userEvent.clear(await screen.findByPlaceholderText("Search by name"));
  userEvent.type(
    await screen.findByPlaceholderText("Search by name"),
    "Testname3"
  );
  expect(await screen.findByText("Testname3")).toBeInTheDocument();
  expect(await screen.findByText("Test description 3")).toBeInTheDocument();
});

test("filters the products throught toogle", async () => {
  userEvent.click(await screen.findByTestId("filter"));
  expect(await screen.findByText("Testname1")).toBeInTheDocument();
  expect(await screen.findByText("Test description 1")).toBeInTheDocument();
});
