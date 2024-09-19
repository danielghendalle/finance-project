import { Box, Stack, Typography } from "@mui/material";
import { parseCookies } from "nookies";
import { ReactNode, useState } from "react";
import { api } from "../../services/api";
//@ts-ignore
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  icon: ReactNode;
  value: ReactNode;
}



const Card = ({ title, icon, value }: CardProps) => {
  return (
    <Box className={styles.card}>
      <div className={styles.header}>
        <Typography className={styles.text} sx={{ fontWeight:"bold"}}>{title}</Typography>
        <Box className={styles.icon}>{icon}</Box>
        </div>
      <Box className={styles.content}>R$ {value}</Box>
    </Box>
  );
};

export default Card;
