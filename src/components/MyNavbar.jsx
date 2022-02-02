import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Badge } from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";
import { AuthContext } from "../contexts/AuthProvider";
import Logoout from "../images/logout.png";

import LoginIcon from "@mui/icons-material/Login";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const MyNavbar = () => {
  const { autosCount } = React.useContext(ClientContext);
  const { authWithGoogle, logOut, user } = React.useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              VIPKYRGYZ CAR's
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Admin Panel</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              VIPKYRGYZ CAR's
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/admin">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin Panel
              </Button>
            </Link>
            <Link to="/add">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                ADD AUTO
              </Button>
            </Link>
          </Box>

          <MenuItem>
            <Link to="/cart">
              <IconButton color="inherit">
                <Badge badgeContent={autosCount} color="error">
                  <LocalGroceryStoreIcon />
                </Badge>
              </IconButton>
            </Link>
          </MenuItem>
          {user ? (
            <>
              <MenuItem>{user.email}</MenuItem>
              <Button onClick={logOut}>
                <img width="30" src={Logoout} alt="logout" />
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={authWithGoogle}>
              <LoginIcon />
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MyNavbar;
