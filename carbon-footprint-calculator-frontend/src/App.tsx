import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

function App() {
  const [food, setFood] = useState("");
  const [consumption, setConsumption] = useState("");
  const [transportation, setTransportation] = useState("");

  const handleChangeFood = (event: SelectChangeEvent) => {
    setFood(event.target.value as string);
  };

  const handleChangeConsumption = (event: SelectChangeEvent) => {
    setConsumption(event.target.value as string);
  };

  const handleChangeTransportation = (event: SelectChangeEvent) => {
    setTransportation(event.target.value as string);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1>What have you done today?</h1>
        <div style={{ margin: "10px 0" }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Food</InputLabel>
              <Select
                id="select-food"
                value={food}
                label="Food"
                onChange={handleChangeFood}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Consumption</InputLabel>
              <Select
                id="select-consumption"
                value={consumption}
                label="Consumption"
                onChange={handleChangeConsumption}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Transportation</InputLabel>
              <Select
                id="select-transportation"
                value={transportation}
                label="Transportation"
                onChange={handleChangeTransportation}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <h2>
          You have X times better/worse CO2 emissions than the average person.
        </h2>
      </div>
    </>
  );
}

export default App;
