import React from "react";
import { AgChartsReact } from "ag-charts-react";

export default function Bars({ data, name }) {
  let options = {
    title: { text: name.toUpperCase() },
    data: data,
    series: [
      {
        type: "bar",
        xKey: "country",
        yKeys: [name],
        yNames: [name],
        showInLegend: false,
        fills : ["#343a40"]
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
      },
      {
        type: "category",
        position: "left",
      },
    ],
  };
  return <AgChartsReact options={options} />;
}
