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
    foodItem: string;
}


export default function FoodItemDropdown({data}: Food[]) {

    const [foods, setFoods] = useState<Food[]>(data);
    const [food, setFood] = useState<string>("");
    const [foodItem, setFoodItem] = useState<string>("");

    const handleChangeFood = (event: SelectChangeEvent<string>) => {
        setFood(event.target.value as string);
    };
    
    const handleChangeFoodItem = (event: SelectChangeEvent<string>) => {
        setFoodItem(event.target.value as string);
    };

    return(
        <div>
            <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
            <InputLabel>Food</InputLabel>
            <Select
                id="select-food"
                value={food}
                label="Food"
                onChange={handleChangeFood}>
                {[...new Set(foods.map(item => item.category))].map((food, id) => (
                <MenuItem key={id} value={food}>
                    {food}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
        </Box>
    
        { food !== null && 
            <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
            <InputLabel>Carbs</InputLabel>
            <Select
                id="select-food"
                value={foodItem}
                label="Food"
                onChange={handleChangeFoodItem}>
                {
                    foods
                    .filter(item => item.category === food)
                    .map(item => (
                    <MenuItem key={item.id} value={item.foodItem}> 
                        {item.foodItem} 
                    </MenuItem>
                    ))
                }
            </Select>
            </FormControl>
        </Box>}
      </div>
    );

}

