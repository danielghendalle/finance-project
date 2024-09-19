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
        <div className={styles.menuButton}>
          <MenuBtn
            className={styles.menuIcon}
            onClick={() => setIsDrawerOpen(true)}
          />
        </div>
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
          {/* <Box className={styles.content}>
          <Stack spacing={2}>
            <div className={styles.link}>
            <Link
              color={grey[100]}
              marginTop={2}
              underline="none"
              className={styles.link}
              marginRight={16}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <Stack spacing={1} direction="row">
                <HomeOutlinedIcon className={styles.icon} />
                <Typography>Início</Typography>
              </Stack>
            </Link>
            </div>
            <div></div>
            <Link
              color={grey[100]}
              underline="none"
              className={styles.link}
              onClick={() => {
                navigate("/users");
              }}
            >
              <Stack spacing={1} direction="row">
                <PersonOutlinedIcon />
                <Typography>Usuários</Typography>
              </Stack>
            </Link>
            <Button
              className={styles.logoutButton}
              onClick={Logout}
              color="error"
              startIcon={<ExitToAppIcon />}
            >
              Sair
            </Button>
          </Stack>
        </Box> */}
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
