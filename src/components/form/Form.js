import {
  Avatar,
  Box,
  Button,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Form.css";
import { regionData } from "../../data/regionData";
import { useCart } from "../../context/cart-context";
import { ItemModal } from "../modal/ItemModal";
import {Chips, SelectRegion} from '../index'
export function Form() {
  const boxStyles = {
    margin: "0 2.5rem",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editState, setEditState] = useState(false);
  const { itemInCart, form, setForm, formHandler } = useCart();
  const totalPrice = itemInCart?.reduce(
    (acc, curr) =>
      curr ? acc + curr.selectedBallPrice * curr.qty + (curr.bag ? 2 : 0) : acc,
    0
  );

  return (
    <div className="form-container" >
      <Box sx={boxStyles}>
        <Typography variant="h4" color="primary">Fill this form</Typography>
        <Typography variant="subtitle1">We'll use this info to dominate the poke world! Muhahahahah</Typography>
        <TextField
          sx={{ display: "block", width: "auto", marginBottom:"1rem" }}
          id="filled-basic"
          label="Full name"
          variant="filled"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <TextField
          sx={{ display: "block", width: "auto" }}
          id="filled-basic"
          label="Code name"
          variant="filled"
          onChange={(e) => setForm({ ...form, codeName: e.target.value })}
          required
        />
        <Slider
          size="small"
          defaultValue={70}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={(e) => setForm({ ...form, distance: e.target.value })}
          required
        />
        <p >
          How far is your nearest pokemon center? (In KMs)
        </p>
        <SelectRegion setForm={setForm} form={form} />
        <p variant="caption">Choose your starter pokemon</p>
        <ul className="avatar-pokemon">
          {regionData
            .filter((item) => item.region === form?.region)
            .map((pokemon) => (
              <li key={pokemon.name}
              >
                <Avatar className="avatar-hover"
                  onClick={() =>
                    setForm({ ...form, pokemon: pokemon.name })
                  }
                  alt={pokemon.name}
                  src={pokemon.img}
                  sx={{ width: 60, height: 60, backgroundColor: "#DFDFDF" }}
                />
              </li>
            ))}
        </ul>
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom:"1rem"
          }}
        >
          What do you want to pack?
          <ItemModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            setForm={setForm}
            form={form}
            setEditState={setEditState}
            editState={editState}
          />
        </Typography>

        <Chips
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setEditState={setEditState}
        />
        <p className="total-cost">Total cost <span className="ml-auto">${totalPrice ? totalPrice : 0}</span></p>
        <Button variant="contained" onClick={formHandler}>
          start my journey
        </Button>
      </Box>
    </div>
  );
}
