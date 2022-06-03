import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useCart } from "../../context/cart-context";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export function Chips({ handleOpen, setEditState }) {
  const { itemInCart, removeFromCart, setItemDetail } = useCart();

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {itemInCart.map((data) => {
        return (
          <ListItem key={data.id} >
            <Chip 
              onClick={() => {
                setItemDetail({
                  id: data.id,
                  selectedBall: data.selectedBall,
                  selectedBallPrice: data.selectedBallPrice,
                  qty: data.qty,
                  bag: data.bag,
                });
                handleOpen();
                setEditState(true);
              }}
              sx={data.bag?{backgroundColor:"#75F4FE"}:{}}
              label={data.qty + " " + data.selectedBall}
              onDelete={removeFromCart(data.id)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
