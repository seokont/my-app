import React, { useState, forwardRef } from "react";
// import TextField from '@mui/material/TextField';
import { IMaskInput } from "react-imask";
import Input from "@mui/material/Input";

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="+{38#} (00) 000-00-00"
      definitions={{
        "#": /[0]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const PhoneInput = ({ setPhone }) => {
  const [values, setValues] = useState("+380 (99) 000-00-00");

  const handleChange = (event) => {
    setPhone(event.target.value);
    setValues(event.target.value);
  };
  return (
    <Input
      onClick={() => {
        setValues("");
      }}
      style={{ marginTop: "15px" }}
      value={values}
      onChange={handleChange}
      name="textmask"
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
    />
  );
};
export default PhoneInput;
