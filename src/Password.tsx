import React, { useState, useEffect, useReducer } from "react";
import { Checkbox, Slider, Input, TextField, Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";

import {
  Title,
  Container,
  PasswordContent,
  NewIconButton,
  LengthContainer,
  Content,
} from "./CustomComponent";

interface State {
  upperCase: boolean;
  lowerCase: boolean;
  numbers: boolean;
  symbols: boolean;
  lengths: number;
}

type Action =
  | { type: "upperCase"; payload: boolean }
  | { type: "lowerCase"; payload: boolean }
  | { type: "numbers"; payload: boolean }
  | { type: "symbols"; payload: boolean }
  | { type: "lengths"; payload: number };

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

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "upperCase":
      return { ...state, upperCase: action.payload };
    case "lowerCase":
      return { ...state, lowerCase: action.payload };
    case "numbers":
      return { ...state, numbers: action.payload };
    case "symbols":
      return { ...state, symbols: action.payload };
    case "lengths":
      return { ...state, lengths: action.payload };
  }
};

const charOfUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charOfLowerCase = "abcdefghijklmnopqrstuvwxyz";
const charOfNumbers = "0123456789";
const charOfSymbols = "!@#$%^&*";

export default function Password() {
  const [password, setPassword] = useState<string>(() => defaultPassword());

  const initState = {
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
    lengths: 8,
  };
  const [state, dispatch] = useReducer(reducer, initState);

  const ChangePassword = () => {
    let charset = "";
    if (state.upperCase) charset += charOfUpperCase;
    if (state.lowerCase) charset += charOfLowerCase;
    if (state.numbers) charset += charOfNumbers;
    if (state.symbols) charset += charOfSymbols;
    let retVal = "";
    for (let i = 0, n = charset.length; i < state.lengths; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  useEffect(() => {
    const password = ChangePassword();
    setPassword(password);
  }, [state]);

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
    dispatch({ type: "lengths", payload: value });

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
          value={state.lengths}
          onChange={(event, newValue) => dispatch({ type: "lengths", payload: newValue as number })}
          min={6}
          max={128}
        />
        <Input
          value={state.lengths}
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
        <Checkbox
          checked={state.upperCase}
          onChange={() =>
            dispatch({ type: "upperCase", payload: !state.upperCase })
          }
        />
      </Content>
      <Content>
        a-z
        <Checkbox
          checked={state.lowerCase}
          onChange={() =>
            dispatch({ type: "lowerCase", payload: !state.lowerCase })
          }
        />
      </Content>
      <Content>
        0-9
        <Checkbox
          checked={state.numbers}
          onChange={() =>
            dispatch({ type: "numbers", payload: !state.numbers })
          }
        />
      </Content>
      <Content>
        !@#$%
        <Checkbox
          checked={state.symbols}
          onChange={() =>
            dispatch({ type: "symbols", payload: !state.symbols })
          }
        />
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
