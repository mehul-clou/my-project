import React from "react";
import { customFetch } from "../util";
import { Filters, PaginationContainer, ProductsContainer } from "../components";

const url = "/products";

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;

export async function loader({ request }) {
  //console.log("products request in loader ", request);

  // const prev = new URL(request.url);
  // console.log("url search are...", prev.search);

  // const final = new URLSearchParams(prev.searchParams);
  // final.set('page',3)
  // console.log(final.toString());

  //  console.log(prev);

  // const prev = new URL(request.url).searchParams;
  // console.log("prev Value ",...prev);
  // console.log("entries() ",[...prev.entries()]);

  // const searchParamsEntries = prev.entries()
  //console.log("searchParasEntries ",...searchParamsEntries);

  // console.log("prev value in ... form", Object.fromEntries( ...prev));/// Not Working

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log("params", params);

  const response = await customFetch(url, {
    params,
  });
  //console.log("products Loader",response);
  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta, params };
}
