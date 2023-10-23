import React from "react";
import classnames from "classnames";

export default function Avatar({ size = "normal", prefab }) {
  return (
    <div
      className={classnames(
        "inline-block bg-amber-100 rounded-full overflow-hidden"
      )}
    >
      <img
        className={classnames(size === "small" ? "w-10 h-10 -m-1" : "w-16 h-16 -m-2", " max-w-none")}
        src={process.env.PUBLIC_URL + `/images/avatar_${prefab}.png`}
        alt={prefab}
      />
    </div>
  );
}
