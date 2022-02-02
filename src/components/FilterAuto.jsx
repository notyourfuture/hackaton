import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ClientContext } from "../contexts/ClientProvider";

const FilterAutos = () => {
  let search = new URLSearchParams(window.location.search);
  let navigate = useNavigate();
  const { getAutos } = useContext(ClientContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  function filter(key, value) {
    search.set(key, value);
    const newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setFrom(search.get("price_gte"));
    setTo(search.get("price_lte"));
    getAutos();
    setValue(search.get("q"));
  }

  function reset() {
    navigate("/");
    getAutos();
    setFrom("");
    setTo("");
    setValue("");
  }

  useEffect(() => {
    setFrom(search.get("price_gte"));
    setTo(search.get("price_lte"));
    setValue(search.get("q"));
  }, []);
  return (
    <div className="filter-autos">
      <div
        className="price-filter"
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          onChange={(event) => filter("price_gte", event.target.value)}
          variant="outlined"
          label="From"
          value={from}
        />
        <TextField
          sx={{ margin: "0 20px" }}
          onChange={(event) => filter("price_gte", event.target.value)}
          variant="outlined"
          label="To"
          value={to}
        />
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
      </div>
      <div>
        <TextField
          onChange={(event) => filter("q", event.target.value)}
          variant="outlined"
          label="Live search..."
          value={value}
        />
      </div>
    </div>
  );
};

export default FilterAutos;
