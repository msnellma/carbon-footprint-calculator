// import "./App.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import TextField from "@mui/material/TextField";

interface Food {
  id: number;
  cost: number;
  category: string;
  foodItem: string;
}

interface FoodItemDropdownProps {
  data: Food[];
  setSelectedFood: Dispatch<SetStateAction<Food | undefined>>;
}

export default function FoodItemDropdown({
  data,
  setSelectedFood,
}: FoodItemDropdownProps) {
  const [food, setFood] = useState<string>("");
  const [foodItem, setFoodItem] = useState<string>("");

  const handleChangeFood = (event: SelectChangeEvent<string>) => {
    setFood(event.target.value);
    setFoodItem("");
  };

  const handleChangeFoodItem = (event: SelectChangeEvent<string>) => {
    setFoodItem(event.target.value);
    const selectedFoodObject = data.find(
      (item) => item.foodItem === event.target.value
    );
    // console.log(selectedFoodObject);
    setSelectedFood(selectedFoodObject);
  };

  const [kg, setKg] = useState<number | string>("");

  const handleKgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKg(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 100, margin: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Food</InputLabel>
          <Select
            id="select-food"
            value={food}
            label="Food"
            onChange={handleChangeFood}
          >
            {[...new Set(data.map((entry) => entry.category))].map(
              (category, id) => (
                <MenuItem key={id} value={category}>
                  {category}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>

      {food !== "" && (
        <>
          <Box sx={{ minWidth: 100, margin: 2 }}>
            <FormControl fullWidth>
              <InputLabel>{food}</InputLabel>
              <Select
                id="select-food"
                value={foodItem}
                label="Food"
                onChange={handleChangeFoodItem}
              >
                {data
                  .filter((item) => item.category === food)
                  .map((item) => (
                    <MenuItem key={item.id} value={item.foodItem}>
                      {item.foodItem}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 100, margin: 2 }}>
            <TextField
              label="Kg"
              type="number"
              value={kg}
              onChange={handleKgChange}
              fullWidth
            />
          </Box>
          {kg !== "" && (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 20, margin: 2 }}
            >
              <span className="material-symbols-outlined small-icon">add</span>
            </Button>
          )}
        </>
      )}
    </>
  );
}
