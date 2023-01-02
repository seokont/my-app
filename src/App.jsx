import React from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import { Route, Link, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              <Link to="/">
                <Button variant="contained">Головна</Button>
              </Link>
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              <Link to="/users">
                <Button variant="contained">Список</Button>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="App">
        <div className="App-grid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
