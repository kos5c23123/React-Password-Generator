import React, { useState, useEffect } from "react";
import { Checkbox, Slider, Input, TextField, Button } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';

import {
  Title,
  Container,
  PasswordContent,
  NewIconButton,
  LengthContainer,
  Content,
} from "./CustomComponent";

function defaultPassword(): string {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const charOfUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charOfLowerCase = "abcdefghijklmnopqrstuvwxyz";
const charOfNumbers = "0123456789";
const charOfSymbols = "!@#$%^&*";

export default function Password() {
  const [password, setPassword] = useState<string>(() => defaultPassword());
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [length, setLength] = useState<number>(8);

  const ChangePassword = () => {
    let charset = "";
    if (uppercase) charset += charOfUpperCase;
    if (lowercase) charset += charOfLowerCase;
    if (numbers) charset += charOfNumbers;
    if (symbols) charset += charOfSymbols;
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  useEffect(() => {
    const password = ChangePassword();
    setPassword(password);
  }, [uppercase, lowercase, numbers, symbols, length]);

  const handleUppercaseChange = () => {
    setUppercase(!uppercase);
  };

  const handleLowercaseChange = () => {
    setLowercase(!lowercase);
  };

  const handleNumbersChange = () => {
    setNumbers(!numbers);
  };

  const handleSymbolsChange = () => {
    setSymbols(!symbols);
  };

  const handleGeneratePassword = () => {
    const password = ChangePassword();
    setPassword(password);
  };

  const handleLengthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = Number(event.target.value);
    if (value > 128) value = 128;
    if (value < 6) value = 6;
    setLength(value);

    const password = ChangePassword();
    setPassword(password);
  };

  return (
    <Container>
      <Title>Generated Password</Title>
      <PasswordContent>
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
          onClick={handleGeneratePassword}
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
          min={6}
          max={128}
        />
        <Input
          value={length}
          size="small"
          onChange={handleLengthInputChange}
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
        <Checkbox checked={uppercase} onChange={handleUppercaseChange} />
      </Content>
      <Content>
        a-z
        <Checkbox checked={lowercase} onChange={handleLowercaseChange} />
      </Content>
      <Content>
        0-9
        <Checkbox checked={numbers} onChange={handleNumbersChange} />
      </Content>
      <Content>
        !@#$%
        <Checkbox checked={symbols} onChange={handleSymbolsChange} />
      </Content>
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigator.clipboard.writeText(password)}
        sx={{
          background: "linear-gradient(to right bottom, #0065e0, #6B0AC9)",
        }}
      >
        Copy Password
      </Button>
    </Container>
  );
}
