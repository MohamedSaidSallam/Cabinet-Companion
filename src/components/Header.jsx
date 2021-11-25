import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

function Header({ text }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerText}>
        {text}
      </Link>
      <IconButton aria-label="triple dot menu" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </header>
  );
}

Header.propTypes = { text: PropTypes.string.isRequired };
Header.defaultProps = { text: "Cabinet Companion" };

export default Header;
