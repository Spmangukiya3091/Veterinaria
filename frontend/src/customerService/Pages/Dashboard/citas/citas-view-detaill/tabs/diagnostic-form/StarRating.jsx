import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating, onChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starRating) => {
    setHoverRating(starRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starRating) => {
    onChange(starRating);
  };

  const stars = [1, 2, 3, 4, 5].map((star) => (
    <FontAwesomeIcon
      key={star}
      icon={solidStar}
      className="star me-2"
      onMouseEnter={() => handleMouseEnter(star)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(star)}
      style={{
        color: star <= (hoverRating || rating) ? "#336CFB" : "#DCDCDC",
        cursor: "pointer",
        fontSize: "24px", // Adjust the size of the stars as needed
      }}
    />
  ));

  return (
    <>
      <div className="stars">{stars}</div>
      <div className="star-count mx-2 fw-bolder">{rating}</div>
    </>
  );
};

export default StarRating;
