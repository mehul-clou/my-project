import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorElements() {
  const error = useRouteError();
  //console.log(error);

  return <h4 className="font-bold text-4xl">there was an error from landing page... </h4>;
}

export default ErrorElements;
