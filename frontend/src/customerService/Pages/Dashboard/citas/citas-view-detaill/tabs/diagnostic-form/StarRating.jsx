import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating, totalStars = 5 }) => {
  const filledStars = Math.round(rating); // Round the rating to the nearest whole number

  const starElements = Array.from({ length: totalStars }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={solidStar}
      className={`svg-icon svg-icon-2 ${index < filledStars ? "checked" : "unchecked"}`}
      style={{
        color: index < filledStars ? "#336CFB" : "#DCDCDC",
        cursor: "pointer",
        fontSize: "15px", // Adjust the size of the stars as needed
      }}
    />
  ));

  return (
    <div className="rating justify-content-start">
      <div className="rating-label">{starElements}</div>
    </div>
  );
};

export default StarRating;
