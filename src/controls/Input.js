import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props){
  const {name,label,value,variant,onChange,error=null,...other}=props; //buradaki özelliklere erişebiliriz.

  return (
    <TextField
    variant={variant || "outlined"}
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    {...other}
    {...(error && {error:true,helperText:error})}
    />
  )
}