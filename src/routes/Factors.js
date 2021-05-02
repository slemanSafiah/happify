import React, { useState, useEffect, useContext } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import SearchableSelect from "../components/SearchableSelect";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/Context";
import Chart from "react-google-charts";
const YEARS = ["2015", "2016", "2017", "2018", "2019", "2020"];


const Factors = (props) => {
  const [rowData, setRowData] = useState([]);
  const [year, setYear] = useState([]);
  const [limit, setLimit] = useState(null);
  const [country, setCountry] = useState([])
  const [countries, setCountries] = useState([]);
  const [economy, setEconomy] = useState([])
  const [family, setFamily] = useState([])
  const [health, setHealth] = useState([])
  const [freedom, setFreedom] = useState([])
  const [generosity, setGenerosity] = useState([])
  const [trust, setTrust] = useState([])

  const { user } = useContext(AuthContext);

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
          if (data) {
            let eco = [["Country", "Economy", { role: "style" }], ["", 0.0, ""]]
            eco.push(...data.map(ele => [ele.country, parseFloat(ele.economy), "color : #4287f5"]))
            eco = eco.slice(0, Math.min(12, eco.length))
            setEconomy(eco)
            let fam = [["Country", "Family", { role: "style" }], ["", 0.0, ""]]
            fam.push(...data.map(ele => [ele.country, parseFloat(ele.family), "color : #4287f5"]))
            fam = fam.slice(0, Math.min(12, eco.length))
            setFamily(fam)
            let hel = [["Country", "Health", { role: "style" }], ["", 0.0, ""]]
            hel.push(...data.map(ele => [ele.country, parseFloat(ele.health), "color : #4287f5"]))
            hel = hel.slice(0, Math.min(12, eco.length))
            setHealth(hel)
            let fre = [["Country", "Freedom", { role: "style" }], ["", 0.0, ""]]
            fre.push(...data.map(ele => [ele.country, parseFloat(ele.freedom), "color : #4287f5"]))
            fre = fre.slice(0, Math.min(12, eco.length))
            setFreedom(fre)
            let gen = [["Country", "Generosity", { role: "style" }], ["", 0.0, ""]]
            gen.push(...data.map(ele => [ele.country, parseFloat(ele.generosity), "color : #4287f5"]))
            gen = gen.slice(0, Math.min(12, eco.length))
            setGenerosity(gen)
            let tru = [["Country", "Trust", { role: "style" }], ["", 0.0, ""]]
            tru.push(...data.map(ele => [ele.country, parseFloat(ele.trust), "color : #4287f5"]))
            tru = eco.slice(0, Math.min(12, eco.length))
            setTrust(tru)
          }
          setRowData(data)

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
        <input type='number' onChange={({ target }) => setLimit(target.value)} placeholder='Limit' style={{ width: '10rem' }} className='form-control '>
        </input>
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
        <div className="App" style={{ width: "100%" }}>
          {limit == 1 ? <h4 style={{ position: "relative", left: "35%", top: "20px" }} >set limit more than 1 to show chart</h4> :
            <div>
              <Chart chartType="BarChart" width="100%" height="200px" data={economy} />
              <Chart chartType="BarChart" width="100%" height="200px" data={family} />
              <Chart chartType="BarChart" width="100%" height="200px" data={health} />
              <Chart chartType="BarChart" width="100%" height="200px" data={freedom} />
              <Chart chartType="BarChart" width="100%" height="200px" data={generosity} />
              <Chart chartType="BarChart" width="100%" height="200px" data={trust} />
            </div>
          }
        </div>
      </div>
      <div>

      </div>
    </Container>
  );
};

export default Factors;
