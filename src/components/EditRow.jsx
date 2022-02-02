import { Button, TableCell, TableRow } from "@mui/material";
import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminProvider";

const EditRow = ({ editAuto, setEditAuto }) => {
  const [auto, setAuto] = useState(editAuto);
  const { saveEditedAuto } = useContext(AdminContext);
  function handleSubmit(event) {
    let obj = {
      ...auto,
      [event.target.name]: event.target.value,
    };
    setAuto(obj);
  }
  function handleClick() {
    saveEditedAuto(auto);
    setEditAuto(null);
  }

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <input
          name="brand"
          onChange={handleSubmit}
          type="text"
          value={auto.name}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="model"
          onChange={handleSubmit}
          type="text"
          value={auto.model}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="price"
          onChange={handleSubmit}
          type="text"
          value={auto.price}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="volume"
          onChange={handleSubmit}
          type="text"
          value={auto.volume}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="data_of_manufacture"
          onChange={handleSubmit}
          type="text"
          value={auto.data_of_manufacture}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="color"
          onChange={handleSubmit}
          type="text"
          value={auto.color}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name="image"
          onChange={handleSubmit}
          type="text"
          value={auto.image}
        />
      </TableCell>
      <TableCell align="right">
        <Button onClick={handleClick}>SAVE</Button>
      </TableCell>
    </TableRow>
  );
};

export default EditRow;
