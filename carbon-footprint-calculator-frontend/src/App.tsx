import "./App.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
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

  const [result, setResult] = useState<number>(0);

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

  const handleClick = () => {
    //Post saved values from select to backend
    console.log("Food: ", food);
    fetch(baseUrl + "/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food: parseInt(food),
        consumption: parseInt(consumption),
        travel: parseInt(travel),
      }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error("Error calculating impact:", error));
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
                  <MenuItem key={food.id} value={food.cost}>
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
                  <MenuItem key={consumption.id} value={consumption.cost}>
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
                  <MenuItem key={travel.id} value={travel.cost}>
                    {travel.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <Button variant="contained" onClick={handleClick}>
          Calculate Impact
        </Button>
        <h2>You have used {result} kg of CO2 today</h2>
      </div>
    </>
  );
}

export default App;
