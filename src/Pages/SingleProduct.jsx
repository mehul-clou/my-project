import React, { useState } from "react";
import { customFetch, formatPrice, generateAmountOptions } from "../util";
import { useLoaderData, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItems } from "../features/cart/cartSlice";

function SingleProduct() {
  const { product } = useLoaderData();
  //console.log("product from singleProduct is ", product);

  // const amountGenerateFunction = generateAmountOptions(5)
  // console.log('amountgeneratebyfun ',amountGenerateFunction);

  const { price, company, title, image, description, colors } =
    product.attributes;
  const dollarAmount = formatPrice(price);

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  function addToCart() {
    dispatch(addItems({ products: cartProduct }));
  }

  function handleAmount(e) {
    setAmount(parseInt(e.target.value));
  }

  return (
    <section>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
        </ul>
      </div>

      {/*PRODUCTS*/}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/*IMAGE*/}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        {/*PRODUCT*/}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title} </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarAmount} </p>
          <p className="mt-6 leading-8">{description} </p>

          {/*COLORS*/}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    style={{ background: color }}
                    className={`badge  w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    } `}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/*AMOUNT*/}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(5)}
            </select>
          </div>
          {/*CART BTN*/}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={addToCart}
              type="button"
            >
              Add To Bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;

export async function loader({ params }) {
  const response = await customFetch(`products/${params.id}`);
  //console.log({ Product: response.data.data });

  return { product: response.data.data };
}
