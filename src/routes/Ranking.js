import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { Container } from "react-bootstrap";
const YEARS = ["2015", "2016", "2017", "2018", "2019", "2020"];
const Ranking = () => {
  const [rowData, setRowData] = useState([]);
  const [year, setYear] = useState(null);
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setRowData([]);
    const endpoint = new URL("http://131.181.190.87:3000/rankings");
    const params = {};
    if (year) params.year = year;
    if (country) params.country = country;
    Object.keys(params).forEach((param) =>
      endpoint.searchParams.append(param, params[param])
    );
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, [year, country]);

  useEffect(() => {
    fetch("http://131.181.190.87:3000/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);


  return (
    <Container className="page-container">
      <h1>Ranking</h1>
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
      <div className="ag-theme-alpine data-table" >
        <AgGridReact
          overlayNoRowsTemplate={"Loading ..."}
          pagination
          paginationPageSize={10}
          rowData={rowData}
          domLayout="autoHeight"
        >
          <AgGridColumn field="rank" sortable></AgGridColumn>
          <AgGridColumn field="country" sortable></AgGridColumn>
          <AgGridColumn field="score" sortable></AgGridColumn>
          <AgGridColumn field="year" sortable></AgGridColumn>
        </AgGridReact>
      </div>
    </Container>
  );
};

export default Ranking;
