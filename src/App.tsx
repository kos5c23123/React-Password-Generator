import React, { useState } from "react";
import Passphrase from "./Passphrase";
import Password from "./Password";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { styled } from "@mui/material/styles";

const Button = styled(ToggleButton)`
  && {
    color: #ffffff;
    font-weight: bold;
    
    &.Mui-selected, &.Mui-selected:hover {
      color: #ffffff;
      background-color: #fc9003;
    }
  }
`;


export default function App() {
  const [alignment, setAlignment] = useState<string>("Password");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#01062a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        minWidth: "500px"
      }}
    >
      <div style={{width: 330}}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          fullWidth
          sx={{
            background: "#02103f",
          }}
        >
          <Button value="Password">
            <div>Password</div>
          </Button>
          <Button value="Passphrase">
            <div>Passphrase</div>
          </Button>
        </ToggleButtonGroup>
      </div>
      {alignment === "Password" ? <Password /> : <Passphrase />}
    </div>
  );
}
