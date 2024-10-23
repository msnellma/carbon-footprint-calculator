import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FoodItemDropdown from "../components/FoodItemDropdown";
import AddedItem from "../components/AddedItem";
import "../App.css";

interface Food {
  id: number;
  cost: number;
  category: string;
  foodItem: string;
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

interface Item {
  foodItem: string;
  kg: number | string;
}

const FrontPage: React.FC = () => {
  const [food, setFood] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [items, setItems] = useState<Item[]>([]);

  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [consumption, setConsumption] = useState<string>("");

  const [travels, setTravels] = useState<Travel[]>([]);
  const [travel, setTravel] = useState<string>("");

  const [result, setResult] = useState<number>(0);

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetch(baseUrl + "/api/food")
      .then((response) => response.json())
      .then((data: Food[]) => {
        setFood(data);
      })
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
        food: selectedFood?.cost ?? 0, // selectedFood can be undefined, falls back to 0 in that case
        consumption: parseInt(consumption),
        travel: parseInt(travel),
      }),
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error("Error calculating impact:", error));
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      size={12}
      sx={{ minWidth: "100vh", padding: 2 }}
    >
      <h1 style={{ textAlign: "center" }}>What have you done today?</h1>
      {/* <Grid container direction="row" size={12}> */}
      <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
        {/* <Grid size={6}> */}
        <Grid size={{ xs: 6, md: 6 }}>
          <FoodItemDropdown
            data={food}
            setSelectedFood={setSelectedFood}
            setItems={setItems}
          />
          <Box sx={{ width: 100, margin: 2 }}>
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
          <Box sx={{ width: 100, margin: 2 }}>
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
        </Grid>
        {/* <Grid size={6} justifyContent="right"> */}
        <Grid size={{ xs: 6, md: 6 }}>
          <AddedItem items={items} setItems={setItems} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handleClick}>
          Calculate Impact
        </Button>
      </Box>
      <h2 style={{ textAlign: "center" }}>
        You have used {result} kg of CO2 today
      </h2>
    </Grid>
  );
};

export default FrontPage;
