import React, { useState, useEffect, useContext } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/Context";
import Bars from "../components/Bars";

const YEARS = ["2015", "2016", "2017", "2018", "2019", "2020"];
const PAGE_SIZE = 10
const Factors = (props) => {
  const [rowData, setRowData] = useState([]);
  const [year, setYear] = useState([]);
  const [limit, setLimit] = useState(null);
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentPageData, setCurrentPageData] = useState([])

  useEffect(() => {
    setRowData([]);
    if (year.length) {
      const endpoint = new URL(`http://131.181.190.87:3000/factors/${year}`);
      let requestOptions = {
        headers: new Headers({
          Authorization: "Bearer " + user.token,
        }),
      };
      const params = {};

      if (limit) params.limit = limit;
      if (country.length) params.country = country;
      Object.keys(params).forEach((param) =>
        endpoint.searchParams.append(param, params[param])
      );
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setRowData(data);
          setCurrentPageData(rowData.slice(0,PAGE_SIZE))
        });
    }
  }, [year, limit, country]);
  useEffect(() => {
    fetch("http://131.181.190.87:3000/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
    console.log(api.paginationGetCurrentPage())
  };
  const paginationChanged = ({ api }) => {
    let currentDataIndex = api.paginationGetCurrentPage() * PAGE_SIZE 
    setCurrentPageData(rowData.slice(currentDataIndex,Math.min(currentDataIndex+10,rowData.length)))
    console.log(currentPageData)
  };

  return (
    <Container className="page-container">
      <h1>Factors</h1>
      <div className="search-bar">
        <SearchableSelect
          handleChange={setYear}
          options={YEARS}
          placeholder={"Choose A Year..."}
        ></SearchableSelect>
        <SearchableSelect
          handleChange={setCountry}
          options={countries}
          placeholder={"Choose A Country..."}
        ></SearchableSelect>
        <input
          type="number"
          onChange={({ target }) => setLimit(target.value)}
          placeholder="Limit"
          style={{ width: "10rem" }}
          className="form-control "
        ></input>
      </div>
      <div className="ag-theme-alpine data-table-factors">
        <AgGridReact
        
          overlayNoRowsTemplate={"Select A Year"}
          rowData={rowData}
          pagination
          paginationPageSize={PAGE_SIZE}
          cacheBlockSize={PAGE_SIZE}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          onPaginationChanged={paginationChanged}
        >
          <AgGridColumn field="rank" sortable></AgGridColumn>
          <AgGridColumn field="country" filter sortable></AgGridColumn>
          <AgGridColumn field="score" sortable></AgGridColumn>
          <AgGridColumn field="economy" sortable></AgGridColumn>
          <AgGridColumn field="family" sortable></AgGridColumn>
          <AgGridColumn field="health" sortable></AgGridColumn>
          <AgGridColumn field="freedom" sortable></AgGridColumn>
          <AgGridColumn field="generosity" sortable></AgGridColumn>
          <AgGridColumn field="trust" sortable></AgGridColumn>
        </AgGridReact>
      </div>
    { currentPageData.length > 1 ?  <div className='bars-container'>
      <Bars data={currentPageData} name={"economy"}></Bars>
      <Bars data={currentPageData} name={"family"}></Bars>
      <Bars data={currentPageData} name={"health"}></Bars>
      <Bars data={currentPageData} name={"freedom"}></Bars>
      <Bars data={currentPageData} name={"generosity"}></Bars>
      <Bars data={currentPageData} name={"trust"}></Bars>
      </div> : ''}
    </Container>
  );
};

export default Factors;
