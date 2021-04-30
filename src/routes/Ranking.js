import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { FormGroup, Row } from "react-bootstrap";
const YEARS = ["all", "2015", "2016", "2017", "2018", "2019", "2020"];

const Ranking = (props) => {
  const [rowData, setrowData] = useState([]);
  const [year, setYear] = useState("all");
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setrowData([]);
    const endpoint = new URL("http://131.181.190.87:3000/rankings");
    const params = {};
    if (year && year !== "all") params.year = year;
    if (country) params.country = country;
    Object.keys(params).forEach((param) =>
      endpoint.searchParams.append(param, params[param])
    );
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setrowData(data));
  }, [year, country]);

  useEffect(() => {
    fetch("http://131.181.190.87:3000/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <>
      <div className="search-bar">
        <SearchableSelect
          handleChange={setYear}
          options={YEARS}
          placeholder={"Choose A Year..."}
        ></SearchableSelect>

        <SearchableSelect
          handleChange={setCountry}
          options={countries}
          placeholder={"Choose a Country..."}
        ></SearchableSelect>
      </div>
      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          overlayNoRowsTemplate={"Loading ..."}
          pagination
          paginationPageSize={10}
          rowData={rowData}
        >
          <AgGridColumn field="rank" sortable></AgGridColumn>
          <AgGridColumn field="country" sortable></AgGridColumn>
          <AgGridColumn field="score" sortable></AgGridColumn>
          <AgGridColumn field="year" sortable></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};

export default Ranking;
