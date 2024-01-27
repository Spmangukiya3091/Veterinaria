import React from "react";
import Avatar from "react-avatar";

function Avatars({ name }) {
  return (
    <>
      <Avatar name={name} size="40" round color="#007bff" style={{ width: "40px", height: "40px" }} title={name + "'s Avatar"} />
    </>
  );
}

export default Avatars;
