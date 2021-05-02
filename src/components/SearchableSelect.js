import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

export default function SearchableSelect({
  handleChange,
  options,
  placeholder,
}) {
  return (
    <>
      <Typeahead
        id="basic-typeahead-single"
        labelKey="name"
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        clearButton
        highlightOnlyResult
      />
    </>
  );
}
