import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import TextField from "@mui/material/TextField";
import "../App.css";

interface Food {
  id: number;
  cost: number;
  category: string;
  foodItem: string;
}

interface FoodItemDropdownProps {
  data: Food[];
  setSelectedFood: Dispatch<SetStateAction<Food | undefined>>;
  setItems: Dispatch<
    SetStateAction<Array<{ foodItem: string; kg: number | string }>>
  >;
}

export default function FoodItemDropdown({
  data,
  setSelectedFood,
  setItems,
}: FoodItemDropdownProps) {
  const [food, setFood] = useState<string>("");
  const [foodItem, setFoodItem] = useState<string>("");
  const [kg, setKg] = useState<number | string>("");

  const handleChangeFood = (event: SelectChangeEvent<string>) => {
    setFood(event.target.value);
    setFoodItem("");
  };

  const handleChangeFoodItem = (event: SelectChangeEvent<string>) => {
    setFoodItem(event.target.value);
    const selectedFoodObject = data.find(
      (item) => item.foodItem === event.target.value
    );
    setSelectedFood(selectedFoodObject);
  };

  const handleKgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val && Number(val) >= 0) {
      setKg(event.target.value);
    }
  };

  const handleAddItem = () => {
    if (foodItem && kg !== "") {
      setItems((prevItems) => [...prevItems, { foodItem, kg }]); // Update items in parent
      setKg(""); // Reset kg input after adding
    }
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box sx={{ width: 100, margin: 2 }}>
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
                id="select-food-item"
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
          
          <Box sx={{ margin: 2 }}>
            <TextField
              label="Kg"
              type="number"
              value={kg}
              onChange={handleKgChange}
              fullWidth
              sx={{ width: 70 }}
            />
          </Box>
          {kg !== "" && (
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 20, margin: 2 }}
              onClick={handleAddItem}
            >
              <span className="material-symbols-outlined small-icon">add</span>
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
