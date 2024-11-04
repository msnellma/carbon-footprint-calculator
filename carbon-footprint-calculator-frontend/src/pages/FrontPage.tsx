import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ItemDropdown from "../components/ItemDropdown";
import AddedItem from "../components/AddedItem";
import "../App.css";

export interface CarbonItem {
  id: number;
  category: string;
  subCategory: string;
  item: string;
  unit: string;
}

// Format of data in the AddedItem component
export interface Item extends CarbonItem {
  quantity: number;
}

const FrontPage: React.FC = () => {

  const [carbonItems, setCarbonItems] = useState<CarbonItem[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<CarbonItem>();

  const [items, setItems] = useState<Item[]>([]);

  const [result, setResult] = useState<number>(0);

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetch(baseUrl + "/api/allItems")
      .then((response) => response.json())
      .then((data: CarbonItem[]) => {setCarbonItems(data); console.log("Carbon items fetched are " + carbonItems)})
      .catch((error) => console.error("Error fetching result data:", error));
  }, []);


  const uniqueCategories = Array.from(new Set(carbonItems.map(item => item.category)));

  const handleClick = () => {
    console.log(items)
    const formattedData = {
      items: items.map(({id, quantity}) => ({id, quantity}))
    }
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
        {uniqueCategories.map((category) => (
            <ItemDropdown
              key={category}
              data={carbonItems.filter(item => item.category === category)}
              setItems={setItems}
              category={category}
              unit={carbonItems.find(item => item.category === category)?.unit || "unit"}
            />
          ))
        }
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
