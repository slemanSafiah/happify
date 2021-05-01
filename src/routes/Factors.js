import React, { useState, useEffect, useContext } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/Context";
const YEARS = ["2015", "2016", "2017", "2018", "2019", "2020"];

const Factors = (props) => {
  const [rowData, setRowData] = useState([]);
  const [year, setYear] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setRowData([]);
    if (year && year.length) {
      // because year is acutlly stored as an array
      const endpoint = new URL(`http://131.181.190.87:3000/factors/${year}`);
      let requestOptions = {
        headers: new Headers({
          Authorization: "Bearer " + user.token,
        }),
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => setRowData(data));
    }
  }, [year]);
  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
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
      </div>
      <div className="ag-theme-alpine data-table-factors">
        <AgGridReact
          overlayNoRowsTemplate={"Select A Year"}
          rowData={rowData}
          pagination
          paginationPageSize={10}
          cacheBlockSize={10}
          domLayout="autoHeight"
          onGridReady={onGridReady}
        >
          <AgGridColumn field="rank" sortable></AgGridColumn>
          <AgGridColumn field="country" sortable></AgGridColumn>
          <AgGridColumn field="score" sortable></AgGridColumn>
          <AgGridColumn field="economy" sortable></AgGridColumn>
          <AgGridColumn field="family" sortable></AgGridColumn>
          <AgGridColumn field="health" sortable></AgGridColumn>
          <AgGridColumn field="freedom" sortable></AgGridColumn>
          <AgGridColumn field="generosity" sortable></AgGridColumn>
          <AgGridColumn field="trust" sortable></AgGridColumn>
        </AgGridReact>
      </div>
    </Container>
  );
};

export default Factors;
