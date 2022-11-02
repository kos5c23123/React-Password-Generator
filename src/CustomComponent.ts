import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const Title = styled("div")({
  color: "grey",
  fontSize: 14,
  padding: "5px 0px",
});

const Container = styled("div")({
  // margin: "auto",
  // width: "50%",
});

const PassowrdContent = styled("div")({
  color: "#ffffff",
  backgroundColor: "#02103f",
  padding: 10,
  borderRadius: 5,
  display: "flex",
});

const NewIconButton = styled(IconButton)({
  alignSelf: "flex-end",
});

const LengthContainer = styled("div")({
  display: "flex",
  paddingLeft: 5,
});

const Content = styled("div")({
  color: "#ffffff",
  backgroundColor: "#02103f",
  padding: "5px 10px",
  borderRadius: 5,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px 0px",
});

export { Title, Container, PassowrdContent, NewIconButton, LengthContainer, Content };