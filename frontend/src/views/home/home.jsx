import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import comma from "comma-number";
import coronaIcon from "../../assets/coronavirus.png";
import IndiaMap from "../../components/IndiaMap";
import "./styles.css";

const Home = () => {
  const [stateData, setStateData] = useState([]);
  const [currentActiveState, setCurrentActiveState] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (stateData.length === 0)
      axios
        .get("http://localhost:8000/get_state_data")
        .then((res) => {
          setStateData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
  }, []);

  console.log(stateData);
  return (
    <div className="homeContainer">
      <div className="titleBar">
        <img src={coronaIcon} className="coronaIcon" />
        coronaTrack
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: "800px", marginLeft: "20px" }}>
          <IndiaMap className="svgMap" setActiveState={setCurrentActiveState} />
        </div>
        <div className="mapInfoCardWrapper">
          <Card title="Map Guide" className="mapInfoCard">
            {currentActiveState ? (
              <div
                key={stateData[currentActiveState - 1].state_code}
                className="currStateInfo"
              >
                <p>
                  State's Name:{" "}
                  <span className="stateName">
                    {comma(stateData[currentActiveState - 1].state_name)}
                  </span>
                </p>
                <p>
                  Active cases:{" "}
                  <span className="stateActive">
                    {comma(stateData[currentActiveState - 1].active)}
                  </span>
                </p>
                <p>
                  Corona +ve:{" "}
                  <span className="statePositive">
                    {comma(stateData[currentActiveState - 1].positive)}
                  </span>
                </p>
                <p>
                  Cured:{" "}
                  <span className="stateCured">
                    {comma(stateData[currentActiveState - 1].cured)}
                  </span>
                </p>
                <p>
                  Deaths:{" "}
                  <span className="stateDeath">
                    {comma(stateData[currentActiveState - 1].death)}
                  </span>
                </p>
              </div>
            ) : (
              <div>Hover on a state, to look for it's info</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
