import { Box, Button, IconButton, ListItem } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../pages/FrontPage";

interface AddedItemProps {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}

export default function AddedItem({ items, setItems }: AddedItemProps) {
  const handleDelete = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  const handleClearList = () => {
    setItems([]);
  }
  return (
    <>
    <Box flex={1} sx={{ marginLeft: 8 }} display="flex" flexDirection="column" alignItems="center">
      {items.map((item, index) => (
        <ListItem key={index} sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
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
            {`${item.itemName}: ${item.quantity} ${item.unit}`}
          </Button>
        </ListItem>
      ))}
      {items.length > 0 && <Button sx={{ alignSelf: "center" }} variant="outlined" onClick={handleClearList}>Clear list</Button>}
    </Box>
    </>
  );
}
