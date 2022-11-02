import React, { useEffect, useState } from "react";
import word from "./dictionary.json";

import Input from "@mui/material/Input";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";


import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import {
  Title,
  Container,
  PassowrdContent,
  NewIconButton,
  LengthContainer,
  Content,
} from "./CustomComponent";

const symbolChar = /^[!@#$%^&*]+$/;

const WordList = Object.values(word);

export default function Passphrase() {
  const [passphrase, setPassphrase] = useState<string>("");
  const [length, setLength] = useState<number>(3);
  const [symbol, setSymbol] = useState<string>("@");
  const [isUppercase, setIsUppercase] = useState<boolean>(true);
  const [isNumber, setIsNumber] = useState<boolean>(true);
  const [click, setClick] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSymbol(event.target.value);
  };

  useEffect(() => {
    let retVal = "";
    for (let i = 0; i < length; i++) {
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
    setPassphrase(retVal);
  }, [length, symbol, isUppercase, isNumber, click]);
  return (
    <Container>
      <Title>Generated Password</Title>
      <PassowrdContent>
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
          onClick={() => navigator.clipboard.writeText(passphrase)}
        >
          <ContentCopyIcon />
        </NewIconButton>
      </PassowrdContent>
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
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 10) value = 10;
            if (value < 3) value = 3;
            setLength(value as number);
          }}
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
              color: "white"
          }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#02103f',
                color: '#fff',
              },
            },
          }}
        >
          <MenuItem value={"!"}>!</MenuItem>
          <MenuItem value={"@"}>@</MenuItem>
          <MenuItem value={"#"}>#</MenuItem>
          <MenuItem value={"$"}>$</MenuItem>
          <MenuItem value={"%"}>%</MenuItem>
          <MenuItem value={"^"}>^</MenuItem>
          <MenuItem value={"&"}>&</MenuItem>
          <MenuItem value={"*"}>*</MenuItem>
        </Select>
      </Content>
      <Content>
        Uppercase
        <Checkbox
          checked={isUppercase}
          onChange={() => setIsUppercase(!isUppercase)}
        />
      </Content>
      <Content>
        Number
        <Checkbox checked={isNumber} onChange={() => setIsNumber(!isNumber)} />
      </Content>
      <Button
        variant="contained"
        fullWidth
        onClick={() => setClick(!click)}
        sx={{
          background: "linear-gradient(to right bottom, #0065e0, #6B0AC9)",
        }}
      >
        Generate New Password
      </Button>
    </Container>
    
  );
}
