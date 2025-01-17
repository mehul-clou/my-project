import React from "react";
import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";

function Cart() {
  //console.log(`name: ${name}`); // name: Jonathan Smith
  //console.log(`age: ${age}`); // age: 18

  //   const object1 = { a: 1, b: 2, c: 3 };

  //   const entries = Object.entries(object1);

  //   console.log(entries.map(([key, val]) => [key, val * 2]));
  //   const final = Object.fromEntries(entries.map(([key, val]) => [key, val * 2]));
  //   console.log(final);

  //console.log(entries.map((item) => item));

  // const object2 = Object.fromEntries(
  //     Object.entries(object1).map(([key, val]) => [key, val * 2]),
  // );

  //console.log(object2);
  // { a: 2, b: 4, c: 6 }

  const user = useSelector((state)=>state.userState.user)
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8  lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please Login
            </Link>
          )}
         
        </div>
      </div>
    </>
  );
}

export default Cart;
