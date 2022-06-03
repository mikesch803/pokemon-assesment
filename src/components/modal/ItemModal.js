import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ballsData } from "../../data/ballsData";
import { useCart } from "../../context/cart-context";
import './ItemModal.css'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxWidth:'20.5rem',
  borderRadius:'1rem'
};

export function ItemModal({open, handleOpen, handleClose, editState, setEditState}) {
  
  const {itemDetail, addToCart, setItemDetail, updateCart} = useCart();
  const totalPrice = itemDetail.selectedBallPrice * itemDetail.qty;
  return (
    <div className="modal-container">
      <Fab size="small" color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={()=>{handleClose(); setEditState(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color="primary" variant="h4" component="h2">
            Place your order
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We'll use this info to pack your order! Muhahahahahaha
          </Typography>
          <FormControl variant="filled" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-filled-label">
              Choose Item
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={itemDetail.selectedBall}
              label="What's your starting region ?"
              onChange={(e) =>
                setItemDetail({
                  ...itemDetail,
                  selectedBall: e.target.value,
                  selectedBallPrice: ballsData.find(
                    (item) => item.name === e.target.value
                  )?.value,
                })
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ballsData.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Slider
            size="small"
            min={0}
            max={10}
            value={itemDetail.qty}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e) =>
              setItemDetail({ ...itemDetail, qty: e.target.value })
            }
          />
          <Typography variant="body2">Select quantity</Typography>

          <label>I need a bag for that</label>
          <Switch
            checked={itemDetail.bag}
            onChange={() => setItemDetail({...itemDetail, bag: !itemDetail.bag})}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p>
            Cost: <span>${ itemDetail.bag ? totalPrice + 2 : totalPrice}</span>
          </p>
          {editState ? 
          <Button variant="contained" onClick={()=>{updateCart(itemDetail); handleClose();}}>Update cart</Button> :
          <Button variant="contained" onClick={()=>{addToCart(); handleClose();}}>Add to cart</Button>
          }
        </Box>
      </Modal>
    </div>
  );
}
