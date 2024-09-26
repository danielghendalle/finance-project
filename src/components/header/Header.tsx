import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
// @ts-ignore
import { destroyCookie } from "nookies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { ReactComponent as MenuBtn } from "../../assets/icons/hamburguer.svg";
//@ts-ignore
import { ReactComponent as LogoutBtn } from "../../assets/icons/logout.svg";
import styles from "./styles.module.scss";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  function Logout() {
    destroyCookie(undefined, "authorization_token");
    destroyCookie(undefined, "refresh_token");

    return navigate("/");
  }

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Box className={styles.header}>
      <div className={styles.container}>
        <Box
          className={styles.menuButton}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuBtn className={styles.menuIcon} />
        </Box>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          PaperProps={{
            sx: {
              background: "#778DA9",
              width: "12vw",
            },
          }}
        >
          <Box className={styles.drawer}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              className={styles.closeButton}
              onClick={() => setIsDrawerOpen(false)}
            >
              <ChevronLeftIcon sx={{ color: "#E0E1DD" }} />
            </IconButton>
          </Box>
          <List>
            {["Dashboard", "Usuários"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    text === "Dashboard"
                      ? navigate("/dashboard")
                      : navigate("/users");
                  }}
                >
                  <ListItemIcon sx={{ color: "#E0E1DD" }}>
                    {index % 2 === 0 ? (
                      <HomeOutlinedIcon />
                    ) : (
                      <PersonOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      color: "#E0E1DD",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Typography
          variant="h4"
          className={styles.logo}
          sx={{
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            color: "#E0E1DD",
          }}
        >
          {title}
        </Typography>
      </div>
      <div className={styles.logoutBtnContainer}>
        <LogoutBtn
          onClick={Logout}
          className={styles.logoutBtn}
          color="error"
        />
      </div>
    </Box>
  );
};

export default Header;
