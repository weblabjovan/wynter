import { rest } from "msw";
import { setupServer } from 'msw/node';

const productListMock = [
    {id: 1, name: "Testname1", short_description: "Test description 1", is_featured: "1"},
    {id: 2, name: "Testname2", short_description: "Test description 2", is_featured: "0"},
    {id: 3, name: "Testname3", short_description: "Test description 3", is_featured: "0"},
];

const path = location.protocol + '//' + location.host;

const handlers = [
  rest.get(
    `${path}/api/products`,
    (req, res, ctx) => {return res(ctx.json(productListMock))}
  ),
];
  

export const server = setupServer(...handlers);

export { rest } from "msw";