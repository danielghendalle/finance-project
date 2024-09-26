import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
//@ts-ignore
import styles from "./styles.module.scss";
import { currencyMask } from "../../utils/MaskUtils";

interface CardProps {
  title: string;
  icon: ReactNode;
  value: ReactNode;
  type?: "entrada" | "saida" | "total";
}

const Card = ({ title, icon, value, type }: CardProps) => {
  let textColorClass = "";

  switch (type) {
    case "entrada":
      textColorClass = styles.greenText;
      break;
    case "saida":
      textColorClass = styles.redText;
      break;
    case "total":
      textColorClass = styles.blackText;
      break;
    default:
      textColorClass = "";
  }

  return (
    <Box className={styles.card}>
      <div className={styles.header}>
        <Typography className={styles.text} sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box className={styles.icon}>{icon}</Box>
      </div>
      <Box className={`${styles.content} ${textColorClass}`}>{value}</Box>
    </Box>
  );
};

export default Card;
