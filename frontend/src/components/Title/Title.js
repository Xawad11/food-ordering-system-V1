import React from "react";

// Default props can be set for the Title component
export default function Title({
  title,
  fontSize = "2rem",
  margin = "1rem",
  color = "#616161",
  fontWeight = "bold",
}) {
  return <h1 style={{ fontSize, margin, color, fontWeight }}>{title}</h1>;
}
