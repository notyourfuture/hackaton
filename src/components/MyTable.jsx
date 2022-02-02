import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../contexts/AdminProvider";
import { Button } from "@mui/material";
import EditRow from "./EditRow";

export default function MyTable() {
  const { getAutos, autos, deleteAuto } = React.useContext(AdminContext);
  React.useEffect(() => {
    getAutos();
  }, []);

  console.log(autos);

  const [editAuto, setEditAuto] = React.useState(null);
  console.log(editAuto);

  if (!autos) {
    return <h2>Loading...</h2>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">#</TableCell>
            <TableCell align="right">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autos.map((row) => (
            <React.Fragment key={row.id}>
              {editAuto?.id === row.id ? (
                <EditRow setEditAuto={setEditAuto} editAuto={editAuto} />
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.brand}
                  </TableCell>
                  <TableCell align="right">{row.model}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.volume}</TableCell>
                  <TableCell align="right">{row.color}</TableCell>
                  <TableCell align="right">{row.data_of_manufacture}</TableCell>

                  <TableCell align="right">
                    <img width={100} src={row.image} alt="auto" />
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => setEditAuto(row)}>EDIT</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deleteAuto(row.id)}>DELETE</Button>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
