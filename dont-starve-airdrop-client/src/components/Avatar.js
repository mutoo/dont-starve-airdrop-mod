import React from "react";

export default function Avatar({ prefab }) {
  
  return (
    <div className="inline-block w-16 h-16">
      <img
        src={process.env.PUBLIC_URL + `/images/avatar_${prefab}.png`}
        alt={prefab}
      />
    </div>
  );
}
