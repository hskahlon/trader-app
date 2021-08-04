import React from 'react'
import Search from './Components/Search'
import { Typography } from '@material-ui/core';
export default function index() {
  return (
    <div>
      <br></br>
      <Typography variant="h2" align="center">
        Research Center
      </Typography>
      <Search />
    </div>
  )
}
