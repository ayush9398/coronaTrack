const express = require("express");
const fs = require("fs");
const axios = require("axios");
const cors = require('cors')

const DATA_JSON = "myfile.json";
const DATA_FETCH_URI = "https://www.mohfw.gov.in/data/datanew.json";

const app = express();
const port = 8000;

app.use(cors())
let stateData = [];

const getDataFromJSON = async () => {
  const data = fs.readFileSync(DATA_JSON, "utf-8");
  let dataJson = JSON.parse(data);
  const d = new Date();
  const currDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  if (dataJson["date"] !== currDate) {
    let currStateData = [];
    await axios
      .get(DATA_FETCH_URI)
      .then((res) => {
        currStateData = res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    dataJson = {
      date: currDate,
      stateData: currStateData,
    };

    fs.writeFile(DATA_JSON, JSON.stringify(dataJson), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }

  stateData = dataJson["stateData"];
};

app.get("/get_state_data", async (req, res) => {
  await getDataFromJSON();
  console.log("sending data");
  res.send(stateData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
