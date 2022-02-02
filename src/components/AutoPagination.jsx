import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ClientContext } from "../contexts/ClientProvider";

export default function AutoPagination() {
  const { postsPerPage, totalAutosCount, currentPage, setCurrentPage } =
    React.useContext(ClientContext);
  const pagesCount = Math.ceil(totalAutosCount / postsPerPage);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Stack spacing={4}>
        <Pagination
          count={pagesCount}
          page={currentPage}
          onChange={(_, newPage) => {
            setCurrentPage(newPage);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
          color="primary"
        />
      </Stack>
    </div>
  );
}
