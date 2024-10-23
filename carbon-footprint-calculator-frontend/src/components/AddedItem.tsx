import { Box, Button, IconButton, ListItem } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Item {
  foodItem: string;
  kg: number | string;
}

interface AddedItemProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}

export default function AddedItem({ items, setItems }: AddedItemProps) {
  const handleDelete = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  return (
    <Box flex={1} sx={{ marginLeft: 2 }}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Button
            variant="contained"
            fullWidth
            sx={{ maxWidth: 200 }}
            endIcon={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <span className="material-symbols-outlined">close</span>
              </IconButton>
            }
          >
            {`${item.foodItem}: ${item.kg} kg`}
          </Button>
        </ListItem>
      ))}
    </Box>
  );
}
