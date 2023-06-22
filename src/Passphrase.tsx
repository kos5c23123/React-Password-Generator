import React, { useEffect, useState } from "react";
import word from "./dictionary.json";

import Input from "@mui/material/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import LoopIcon from "@mui/icons-material/Loop";

import {
  Title,
  Container,
  PasswordContent,
  NewIconButton,
  LengthContainer,
  Content,
} from "./CustomComponent";

const symbolChar = /^[!@#$%^&*]+$/;

const WordList = Object.values(word);

const symbolOptions = ["!", "@", "#", "$", "%", "^", "&", "*"];

const defaultPassphrase = () => {
  let retVal = "";
  for (let i = 0; i < 3; i++) {
    const randomWord = WordList[Math.floor(Math.random() * WordList.length)];
    retVal += randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    retVal += Math.floor(Math.random() * 10);
    retVal += "@";
  }
  return retVal;
};

export default function Passphrase() {
  const [passphrase, setPassphrase] = useState(() => defaultPassphrase());
  const [length, setLength] = useState(3);
  const [symbol, setSymbol] = useState("@");
  const [isUppercase, setIsUppercase] = useState(true);
  const [isNumber, setIsNumber] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    setSymbol(event.target.value);
  };

  const validateLength = (value: number) => {
    let validatedValue = Math.min(Math.max(value, 3), 10);
    return validatedValue;
  };

  const ChangePassphrase = () => {
    let retVal = "";
    for (let i = 0; i < validateLength(length); i++) {
      const randomWord = WordList[Math.floor(Math.random() * WordList.length)];
      if (isUppercase) {
        retVal += randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
      } else {
        retVal += randomWord;
      }
      if (isNumber) {
        retVal += Math.floor(Math.random() * 10);
      }
      if (symbolChar.test(symbol)) {
        retVal += symbol;
      }
    }
    return retVal;
  };

  useEffect(() => {
    const passphrase = ChangePassphrase();
    setPassphrase(passphrase);
  }, [length, symbol, isUppercase, isNumber]);

  const handleGeneratePassphrase = () => {
    const passphrase = ChangePassphrase();
    setPassphrase(passphrase);
  };

  const handleLengthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = Number(event.target.value);
    setLength(validateLength(value));
  };

  return (
    <Container>
      <Title>Generated Password</Title>
      <PasswordContent>
        <TextField
          id="standard-search"
          type="search"
          variant="standard"
          value={passphrase}
          fullWidth
          inputProps={{
            style: {
              color: "#fff",
              fontSize: 22,
              backgroundColor: "#02103f",
              textAlign: "start",
            },
          }}
          InputProps={{ disableUnderline: true, readOnly: true }}
        />
        <NewIconButton
          color="primary"
          aria-label="Copy"
          onClick={handleGeneratePassphrase}
        >
          <LoopIcon />
        </NewIconButton>
      </PasswordContent>
      <Title>Lengths</Title>
      <LengthContainer>
        <Slider
          aria-label="length"
          value={length}
          onChange={(event, newValue) => setLength(newValue as number)}
          min={3}
          max={10}
        />
        <Input
          value={length}
          size="small"
          onChange={handleLengthInputChange}
          inputProps={{
            min: 3,
            max: 10,
            type: "number",
            "aria-labelledby": "input-slider",
            style: {
              color: "#fff",
              padding: "0px 5px",
              textAlign: "center",
            },
          }}
          disableUnderline={true}
        />
      </LengthContainer>
      <Title>Setting</Title>
      <Content>
        Symbol
        <Select
          labelId="symbol"
          id="symbol"
          value={symbol}
          label="symbol"
          onChange={handleChange}
          sx={{
            color: "#fff",
            backgroundColor: "#02103f",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#02103f",
                color: "#fff",
              },
            },
          }}
        >
          {symbolOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Content>
      <Content>
        Uppercase
        <Checkbox
          checked={isUppercase}
          onChange={() => setIsUppercase((prevIsUppercase) => !prevIsUppercase)}
        />
      </Content>
      <Content>
        Number
        <Checkbox
          checked={isNumber}
          onChange={() => setIsNumber((prevIsNumber) => !prevIsNumber)}
        />
      </Content>
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigator.clipboard.writeText(passphrase)}
        sx={{
          background: "linear-gradient(to right bottom, #0065e0, #6B0AC9)",
        }}
      >
        Copy Password
      </Button>
    </Container>
  );
}
