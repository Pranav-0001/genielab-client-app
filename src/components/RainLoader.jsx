import React from "react";
import "./styles/rainloader.css";

export default function RainLoader() {
  return (
    <div className="wrapper">
      <div className="cloud">
        <div className="cloud_left"></div>
        <div className="cloud_right"></div>
      </div>
      <div className="rain">
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
        <div className="drop"></div>
      </div>
      <div className="surface">
        <div className="hit"></div>
        <div className="hit"></div>
        <div className="hit"></div>
        <div className="hit"></div>
        <div className="hit"></div>
      </div>
    </div>
  );
}
