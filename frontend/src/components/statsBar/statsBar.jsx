import React from "react";
import commaNumber from "comma-number";
import "./styles.css";

const StatsBar = ({ active, cured, deaths }) => {
  return (
    <div className="statsBar">
      <div className="statsCard">
        <div className="title">Current Active</div>
        <div className="data statePositive">{commaNumber(active)}</div>
      </div>
      <div className="statsCard">
        <div className="title">Current Cured</div>
        <div className="data stateCured">{commaNumber(cured)}</div>
      </div>
      <div className="statsCard">
        <div className="title">Current Deaths</div>
        <div className="data stateDeath">{commaNumber(deaths)}</div>
      </div>
    </div>
  );
};

export default StatsBar;
