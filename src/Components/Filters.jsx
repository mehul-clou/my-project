import React from "react";
import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

export default function Filters() {
  const { meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search || ""}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select Category"
        name="Category"
        size="select-sm"
        list={meta.categories}
        defaultValue={category || ""}
      />
      {/* COMPANIES */}
      <FormSelect
        label="select Company"
        name="company"
        size="select-sm"
        list={meta.companies}
        defaultValue={company || ""}
      />
      {/* ORDERS */}
      <FormSelect
        label="Sort By"
        name="order"
        size="select-sm"
        list={["a-z", "z-a", "low", "high"]}
        defaultValue={order}
      />
      {/* PRICE */}
      <FormRange
        label="select Price"
        name="price"
        size="range-sm"
        defaultValue={price}
      />

      {/* SHIPPING */}
      <FormCheckbox
        label="free- shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm ">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
}
