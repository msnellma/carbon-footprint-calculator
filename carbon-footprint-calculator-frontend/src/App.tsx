import "./App.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

interface Food {
  id: number;
  cost: number;
  category: string;
}

interface Consumption {
  id: number;
  cost: number;
  category: string;
}

interface Travel {
  id: number;
  cost: number;
  category: string;
}

function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [food, setFood] = useState<string>("");

  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [consumption, setConsumption] = useState<string>("");

  const [travels, setTravels] = useState<Travel[]>([]);
  const [travel, setTravel] = useState<string>("");

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetch(baseUrl + "/api/food")
      .then((response) => response.json())
      .then((data: Food[]) => setFoods(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "/api/travel")
      .then((response) => response.json())
      .then((data: Travel[]) => setTravels(data))
      .catch((error) => console.error("Error fetching travel data:", error));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "/api/consumption")
      .then((response) => response.json())
      .then((data: Consumption[]) => setConsumptions(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  const handleChangeFood = (event: SelectChangeEvent<string>) => {
    setFood(event.target.value as string);
  };

  const handleChangeConsumption = (event: SelectChangeEvent<string>) => {
    setConsumption(event.target.value as string);
  };

  const handleChangeTravel = (event: SelectChangeEvent<string>) => {
    setTravel(event.target.value as string);
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
                {foods.map((food) => (
                  <MenuItem key={food.id} value={food.id.toString()}>
                    {food.category}
                  </MenuItem>
                ))}
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
                {consumptions.map((consumption) => (
                  <MenuItem
                    key={consumption.id}
                    value={consumption.id.toString()}
                  >
                    {consumption.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel>Travel</InputLabel>
              <Select
                id="select-Travel"
                value={travel}
                label="Travel"
                onChange={handleChangeTravel}
              >
                {travels.map((travel) => (
                  <MenuItem key={travel.id} value={travel.id.toString()}>
                    {travel.category}
                  </MenuItem>
                ))}
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
