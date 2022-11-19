import React, { useEffect, useState } from "react";
import { Skeleton, Table } from "antd";
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

const DATA_JSON = "myfile.json";
const DATA_FETCH_URI = "https://www.mohfw.gov.in/data/datanew.json";

const Home = () => {
  const [stateData, setStateData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentActiveState, setCurrentActiveState] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    let data;
    if (stateData.length === 0) {
      if (localStorage.getItem("data"))
        data = localStorage.getItem("data");
      let dataJson = data ? JSON.parse(data) : {};
      console.log({ dataJson });
      const d = new Date();
      const currDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      if (dataJson["date"] !== currDate) {
        let currStateData = [];
        axios
          .get(DATA_FETCH_URI)
          .then((res) => {
            currStateData = res.data;
            setStateData(currStateData);
            dataJson = {
              date: currDate,
              stateData: currStateData,
            };
            setTableData(
              currStateData
                .filter((_, index) => index !== 36)
                .map((data) => ({
                  name: data.state_name,
                  active: data.active,
                  cured: data.cured,
                  deaths: data.death,
                }))
            );
            localStorage.setItem("data", JSON.stringify(dataJson))
          })
          .catch((error) => {
            console.error(error);
          });

      }
      else {
        setStateData(dataJson.stateData)
        setTableData(
          dataJson.stateData
            .filter((_, index) => index !== 36)
            .map((data) => ({
              name: data.state_name,
              active: data.active,
              cured: data.cured,
              deaths: data.death,
            }))
        );
      }
    }
  }, [stateData]);

  return (
    <div className="homeContainer">
      <div className="titleBar">
        <img src={coronaIcon} className="coronaIcon" />
        coronaTrack
      </div>
      <p style={{ margin: "20px", fontSize: "20px" }}>Hey! This is a fun project where I was trying out few things I learned over time, let me know what you think about this. Cheers!</p>
      {stateData.length > 0 ? (
        <>
          <StatsBar
            active={stateData[stateData.length - 1].active}
            cured={stateData[stateData.length - 1].cured}
            deaths={stateData[stateData.length - 1].death}
          />


          <p style={{ margin: "20px" }}>This map uses Event bubbling in order to have a single function handling the hover event over any state. Also, using the localstorage to store the data for one time call. If user request info on any other date, then the site makes a call and updates data in local storage so only one call is made per day per user. Still experimenting with few things!</p>

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
        </>)
        : (
          <div style={{ height:"100vh" }} >
            <Skeleton />
          </div>
        )}
    </div>
  );
};

export default Home;
