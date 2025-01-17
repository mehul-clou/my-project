import React, { useState } from "react";
import { formatPrice } from "../util";

function FormRange({ label, name, size }) {
  const maxPrice = 100000;
  const step = 1000;
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        max={maxPrice}
        min={0}
        name={name}
        step={step}
        value={selectedPrice}
        className={`range range-primary ${size}`}
        onChange={(e) => setSelectedPrice(e.target.value)}
      />

      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
      
    </div>
  );
}

export default FormRange;
