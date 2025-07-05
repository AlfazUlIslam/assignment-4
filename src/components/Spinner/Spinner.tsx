import React from "react";
import "./Spinner.css";

const Spinner: React.FC = () => {
  return (
    <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
export default Spinner