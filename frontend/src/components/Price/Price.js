import React from "react";

export default function Price({ price, locale = "en-US", currency = "BDT" }) {
  const formatPrice = () => {
    // Round the price to the nearest integer and format it
    const roundedPrice = Math.round(price);
    return `${roundedPrice.toLocaleString()} ৳`;
  };

  return <span>{formatPrice()}</span>;
}
