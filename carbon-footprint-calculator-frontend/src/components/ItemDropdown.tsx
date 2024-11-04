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
import { CarbonItem, Item } from "../pages/FrontPage";

interface FoodItemDropdownProps {
  data: CarbonItem[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  category: string;
  unit: string;
}

export default function FoodItemDropdown({
  data,
  setItems,
  category,
  unit,
}: FoodItemDropdownProps) {
  // const [selectedCategory, setSelectedCategory] = useState<CarbonItem>();
  const [subCategory, setSubCategory] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [item, setItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent<string>) => {
    console.log(data);
    setSubCategory(event.target.value);
    setItem("");
  };

  const handleChangeItem = (event: SelectChangeEvent<string>) => {
    setItem(event.target.value);
    const selectedObject = data.find(
      (item) => item.item === event.target.value
    );
    setId(selectedObject?.id || 0);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (val && Number(val) >= 0) {
      setQuantity(Number(val));
    }
  };

  const handleAddItem = () => {
    if (item && quantity !== 0) {
      setItems((prevItems) => [
        ...prevItems,
        { category, subCategory, id, quantity, item, unit },
      ]); // Update items in parent
      setQuantity(0); // Reset kg input after adding
    }
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box sx={{ width: 100, margin: 2 }}>
        <FormControl fullWidth>
          <InputLabel>{category}</InputLabel>
          <Select
            id={`select-${category}`}
            value={subCategory || ""}
            onChange={handleChange}
          >
            {[...new Set(data.map((entry) => entry.subCategory))].map(
              (subCategory, id) => (
                <MenuItem key={id} value={subCategory}>
                  {subCategory}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>

      {subCategory !== "" && (
        <>
          <Box sx={{ minWidth: 100, margin: 2 }}>
            <FormControl fullWidth>
              <InputLabel>{subCategory}</InputLabel>
              <Select
                id={`select-${category}-item`}
                value={item || ""}
                onChange={handleChangeItem}
              >
                {data
                  .filter((item) => item.subCategory === subCategory)
                  .map((item) => (
                    <MenuItem key={item.id} value={item.item}>
                      {item.item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ margin: 2 }}>
            <TextField
              label={unit}
              type="number"
              value={quantity || ""}
              onChange={handleUnitChange}
              fullWidth
              sx={{ width: 70 }}
            />
          </Box>
          {quantity !== 0 && (
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
