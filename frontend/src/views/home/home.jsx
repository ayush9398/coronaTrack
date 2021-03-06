import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import axios from "axios";
import comma from "comma-number";
import coronaIcon from "../../assets/coronavirus.png";
import IndiaMap from "../../components/IndiaMap";
import "./styles.css";
import StatsBar from "../../components/statsBar";

const tableColumns = [
  {
    title: "State name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => {
      if (a === b) {
        return 0;
      }

      if (a > b) {
        return 1;
      }

      return -1;
    },
    width: "40%",
  },

  {
    title: "Active Cases",
    dataIndex: "active",
    key: "active",
  },
  {
    title: "Cured Cases",
    dataIndex: "cured",
    key: "cured",
  },
  {
    title: "Deaths",
    dataIndex: "deaths",
    key: "deaths",
  },
];

const Home = () => {
  const [stateData, setStateData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentActiveState, setCurrentActiveState] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (stateData.length === 0)
      axios
        .get("http://localhost:8000/get_state_data")
        .then((res) => {
          setStateData(res.data);
          setTableData(
            res.data
              .filter((_, index) => index !== 36)
              .map((data) => ({
                name: data.state_name,
                active: data.active,
                cured: data.cured,
                deaths: data.death,
              }))
          );
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
  }, []);

  return (
    <div className="homeContainer">
      <div className="titleBar">
        <img src={coronaIcon} className="coronaIcon" />
        coronaTrack
      </div>
      {stateData.length > 0 && (
        <>
          <StatsBar
            active={stateData[stateData.length - 1].active}
            cured={stateData[stateData.length - 1].cured}
            deaths={stateData[stateData.length - 1].death}
          />
        </>
      )}
      <div className="lowerSection">
        <div className="mapWrapper">
          <IndiaMap className="svgMap" setActiveState={setCurrentActiveState} />
        </div>
        <div className="mapInfoCardWrapper">
          <div className="mapInfoCard">
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
          </div>
        </div>
      </div>
      <div style={{ margin: "32px" }}>
        <div>State wise Metrics</div>
        <Table
          dataSource={tableData}
          columns={tableColumns}
          // onChange={(changedData) => {
          //   console.log(changedData);
          //   setTableData(changedData);
          // }}
        />
      </div>
    </div>
  );
};

export default Home;
