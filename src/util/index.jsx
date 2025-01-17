import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({ baseURL: productionUrl });

//console.log("customfetchfromindexjs",customFetch);

export const formatPrice = (price) => {  
  const dollarAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format((price / 100).toFixed(2));
  return dollarAmount;
};

export function generateAmountOptions(number) {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option value={amount} key={amount}>
        {amount}
      </option>
    );
  });
}
