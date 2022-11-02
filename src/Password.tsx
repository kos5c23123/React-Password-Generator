import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
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

const defaultPaswsword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export default function Password() {
  const [password, setPassword] = useState<string>(() => defaultPaswsword());
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [length, setLength] = useState<number>(8);
  const [click, setClick] = useState<boolean>(false);

  useEffect(() => {
    const charOfUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charOfLowerCase = "abcdefghijklmnopqrstuvwxyz";
    const charOfNumbers = "0123456789";
    const charOfSymbols = "!@#$%^&*";
    let charset = "";
    if (uppercase) charset += charOfUpperCase;
    if (lowercase) charset += charOfLowerCase;
    if (numbers) charset += charOfNumbers;
    if (symbols) charset += charOfSymbols;
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  }, [uppercase, lowercase, numbers, symbols, length, click]);

  return (
    <Container>
      <Title>Generated Password</Title>
      <PassowrdContent>
        <TextField
          id="standard-search"
          type="search"
          variant="standard"
          value={password}
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
          onClick={() => navigator.clipboard.writeText(password)}
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
          min={6}
          max={128}
        />
        <Input
          value={length}
          size="small"
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 128) value = 128;
            if (value < 6) value = 6;
            setLength(value as number);
          }}
          inputProps={{
            min: 6,
            max: 128,
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
        A-Z
        <Checkbox
          checked={uppercase}
          onChange={() => setUppercase(!uppercase)}
        />
      </Content>
      <Content>
        a-z
        <Checkbox
          checked={lowercase}
          onChange={() => setLowercase(!lowercase)}
        />
      </Content>
      <Content>
        0-9
        <Checkbox checked={numbers} onChange={() => setNumbers(!numbers)} />
      </Content>
      <Content>
        !@#$%
        <Checkbox checked={symbols} onChange={() => setSymbols(!symbols)} />
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
      {/* <div>
        min number
        <Input
          value={minInputNumber}
          size="small"
          onChange={(e) => setMinInputNumber(Number(e.target.value))}
          inputProps={{
            min: 1,
            max: getMinNumber(),
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        min !@#$%
        <Input
          value={minInputSymbols}
          size="small"
          onChange={(e) => setMinInputSymbols(Number(e.target.value))}
          inputProps={{
            min: 1,
            max: getMinNumber(),
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div> */}
    </Container>
  );
}
