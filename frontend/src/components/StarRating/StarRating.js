import React from "react";
import classes from "./starRating.module.css";

export default function StarRating({ stars, size = 24, onStarClick }) {
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    marginRight: `${size * 0.15}px`,
    cursor: onStarClick ? "pointer" : "default", // Make clickable if onStarClick is provided
  };

  function Star({ number }) {
    const handleClick = () => {
      if (onStarClick) {
        onStarClick(number); // Pass clicked star number to parent
      }
    };

    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img
        src="/star-full.svg"
        className={classes.star}
        style={styles}
        alt={`Star ${number}`}
        onClick={handleClick}
      />
    ) : stars >= halfNumber ? (
      <img
        src="/star-half.svg"
        className={classes.star}
        style={styles}
        alt={`Half Star ${number}`}
        onClick={handleClick}
      />
    ) : (
      <img
        src="/star-empty.svg"
        className={classes.star}
        style={styles}
        alt={`Empty Star ${number}`}
        onClick={handleClick}
      />
    );
  }

  return (
    <div className={classes.rating}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
}
