import React from "react";
import Hero from "../Components/Hero";
import { customFetch } from "../util";
import FeaturedProducts from "../Components/FeaturedProducts";

const url = "/products?featured=true";

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default Landing;

export const loader = async () => {
  const response = await customFetch(url);
  //console.log(response.data.data)
  const products = response.data.data;
  //console.log("landing return {products} is ",{products});

  return { products };
};
