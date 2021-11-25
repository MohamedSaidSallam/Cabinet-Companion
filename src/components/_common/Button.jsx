import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

const Button = styled(MuiButton)(({ theme }) => ({
  borderRadius: "2em",
}));

export default Button;
