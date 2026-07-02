import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Price from "../../components/Price/Price";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import { useCart } from "../../hooks/useCart";
import { getById } from "../../services/foodService";
import classes from "./foodPage.module.css";
import NotFound from "../../components/NotFound/NotFound";
import { useAuth } from "../../hooks/useAuth"; // Importing the useAuth hook

export default function FoodPage() {
  const [food, setFood] = useState({});
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [newReview, setNewReview] = useState(""); // State for new review text
  const [newRating, setNewRating] = useState(0); // State for new review rating
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the logged-in user

  // Load stored reviews from sessionStorage when the page loads
  useEffect(() => {
    const storedReviews = sessionStorage.getItem(`reviews_${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleRatingChange = (rating) => {
    setNewRating(rating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "") return;
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const review = {
      username: user.name,
      text: newReview,
      rating: newRating,
      timestamp: new Date().toISOString(),
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);

    // Store the updated reviews in sessionStorage
    sessionStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

    setNewReview("");
    setNewRating(0);
  };

  // Load food data
  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);

  return (
    <>
      {!food ? (
        <NotFound message="Food Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>

            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>

            {/* Review Section */}
            <div className={classes.reviews}>
              <h3>Customer Reviews</h3>
              <div className={classes.reviewList}>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className={classes.reviewItem}>
                      <strong>{review.username}</strong>
                      <p>{review.text}</p>
                      <StarRating stars={review.rating} size={20} />
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
              </div>

              <form onSubmit={handleReviewSubmit}>
                {/* Star Rating Selection */}
                <div className={classes.ratingInput}>
                  <h4>Your Rating:</h4>
                  <StarRating
                    stars={newRating}
                    size={30}
                    onStarClick={handleRatingChange}
                  />
                </div>

                <textarea
                  className={classes.reviewInput}
                  value={newReview}
                  onChange={handleReviewChange}
                  placeholder="Write Comment here..."
                />
                <button type="submit">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
