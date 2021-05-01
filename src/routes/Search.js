
import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class DataLine {
  constructor(data) {
    this.data = data
  }
  get DataLineObj() {
    return {
      labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      datasets: [
        {
          label: "Rank",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.data,
        },
      ]
    }
  }
};

const Search = (props) => {


  const [rowData, setrowData] = useState([]);
  const [year, setYear] = useState("all");
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [dataLine, setdataLine] = useState(null);

  useEffect(() => {
    console.log(dataLine)
    setrowData([]);
    const endpoint = new URL("http://131.181.190.87:3000/rankings");
    const params = {};

    if (country !== null && country.length > 0) {
      params.country = country;
      Object.keys(params).forEach((param) =>
        endpoint.searchParams.append(param, params[param])
      );
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setrowData(data)
          let d = data.map(ele => ele.rank)
          let dd = new DataLine(d)
          setdataLine(dd.DataLineObj)
        })
    }
  }, [country]);

  useEffect(() => {
    fetch("http://131.181.190.87:3000/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);
  return (
    <>
      <div className="search-bar" style={{ position: "absolute", left: "10px" }}>
        <SearchableSelect
          handleChange={setCountry}
          options={countries}
          placeholder={"Choose a Country..."}
        ></SearchableSelect>
      </div>
      <div className="ag-theme-alpine" style={{ position: "absolute", left: "10px", top: "20%", height: 350, width: "46%" }}>
        <AgGridReact
          overlayNoRowsTemplate={"Select a Country ..."}
          rowData={rowData}
        >
          <AgGridColumn field="year" sortable></AgGridColumn>
          <AgGridColumn field="rank" sortable></AgGridColumn>
          <AgGridColumn field="score" sortable></AgGridColumn>
        </AgGridReact>
      </div>
      <div style={{ position: "absolute", width: "50%", top: "10%", right: "0px" }}>
        <MDBContainer>
          {country ? <h3 className="mt-5">Line Chart</h3> : <></>}
          <Line data={dataLine} options={{ responsive: true }} />
        </MDBContainer>
      </div>
    </>
  );
};

export default Search;
