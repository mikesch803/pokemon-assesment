import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export  function SelectRegion({region, regionHandler, form, setForm}) {
  return (
    <FormControl variant="filled" sx={{ m: 1, width: '100%' }}>
    <InputLabel id="demo-simple-select-filled-label">What's your starting region ?</InputLabel>
    <Select 
      labelId="demo-simple-select-filled-label"
      id="demo-simple-select-filled"
      value={form.region}
      label="What's your starting region ?"
    //   onChange={regionHandler}
      onChange={(e)=>setForm({...form, region:e.target.value})}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={"kanto"}>Kanto</MenuItem>
      <MenuItem value={"jhoto"}>Jhoto</MenuItem>
      <MenuItem value={"hoenn"}>Hoenn</MenuItem>
    </Select>
  </FormControl>
  )
}
