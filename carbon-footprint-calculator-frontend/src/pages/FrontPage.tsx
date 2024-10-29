import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ItemDropdown from "../components/ItemDropdown";
import AddedItem from "../components/AddedItem";
import "../App.css";

export interface Category {
  id: number;
  cost: number;
  subCategory: string;
  item: string;
}

// Format of data in the AddedItem component
export interface Item {
  category: string; //Food, Consumption or Travel
  subCategory: string; //subcategories
  id: number;
  quantity: number;
  itemName: string;
  unit: string;
}

type ResultType = {
  [key: string]: Array<{ id: number; quantity: number }>;
};

const FrontPage: React.FC = () => {
  const [food, setFood] = useState<Category[]>([]);
  const [selectedFood, setSelectedFood] = useState<Category>();

  const [consumption, setConsumption] = useState<Category[]>([]);
  const [selectedConsumption, setSelectedConsumption] = useState<Category>();

  const [travel, setTravel] = useState<Category[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<Category>();

  const [items, setItems] = useState<Item[]>([]);

  const [result, setResult] = useState<number>(0);

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetch(baseUrl + "/api/food")
      .then((response) => response.json())
      .then((data: Category[]) => {
        setFood(data);
      })
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "/api/travel")
      .then((response) => response.json())
      .then((data: Category[]) => setTravel(data))
      .catch((error) => console.error("Error fetching travel data:", error));
  }, []);

  useEffect(() => {
    fetch(baseUrl + "/api/consumption")
      .then((response) => response.json())
      .then((data: Category[]) => setConsumption(data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  const handleClick = () => {
    const formattedData = items.reduce<ResultType>(
      (acc: ResultType, item: Item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }

        acc[item.category].push({
          id: item.id,
          quantity: item.quantity,
        });

        return acc;
      },
      {}
    );
    console.log("Formatted data: ", formattedData);
    // Post saved values from select to backend
    console.log("Food: ", food);
    fetch(baseUrl + "/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
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
      <Grid container direction="row" spacing={2} sx={{ width: "100%" }}>
        <Grid size={{ xs: 6, md: 6 }}>
          <ItemDropdown
            data={food}
            setSelectedCategory={setSelectedFood}
            setItems={setItems}
            category={"foods"}
            unit={"g"}
          />
          <ItemDropdown
            data={travel}
            setSelectedCategory={setSelectedTravel}
            setItems={setItems}
            category={"travels"}
            unit={"km"}
          />
          <ItemDropdown
            data={consumption}
            setSelectedCategory={setSelectedConsumption}
            setItems={setItems}
            category={"consumptions"}
            unit={"pc"}
          />
        </Grid>
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
