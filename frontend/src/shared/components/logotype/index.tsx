import React from "react";
import { Link } from "react-router-dom";

export const Logotype: React.FC<{className: string}> = (props: {className: string}) => {
  return (
    <Link to="/">
      <img
        src={process.env.PUBLIC_URL + "/images/logotype.svg"}
        alt="МойСклад"
        className={props.className}
      />
    </Link>
  );
};

export default Logotype;