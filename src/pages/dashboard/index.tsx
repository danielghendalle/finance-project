import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CalculateIcon from "@mui/icons-material/Calculate";
import DeleteIcon from "@mui/icons-material/Delete";
//@ts-ignore
import { ReactComponent as IconePagamento } from "../../assets/icons/iconePagamento.svg";
//@ts-ignore
import {
  Box,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//@ts-ignore
import { ReactComponent as IconeSaida } from "../../assets/icons/iconeSaida.svg";
import Card from "../../components/card/Card";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import Header from "../../components/header/Header";
import CustomSwitch from "./../../components/CustomSwitch";
import { currencyMask } from "./../../utils/MaskUtils";
import styles from "./styles.module.scss";
import { useDashboard } from "./useDashboard";

const Dashboard = () => {
  const {
    loading,
    entries,
    expends,
    total,
    finances,
    register,
    errors,
    handleSubmit,
    handleAdd,
    handleDelete,
  } = useDashboard();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "identificator", headerName: "Identificação", width: 200 },
    { field: "value", headerName: "Valor", width: 200 },
    {
      field: "Excluir",
      renderCell: (cellValues) => (
        <IconButton
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => handleDelete(cellValues.row)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      width: 130,
    },
    {
      field: "Tipo de despesa",
      renderCell: (cellValues) =>
        cellValues.row.expend === false ? <>Entrada</> : <>Saída</>,
      width: 130,
    },
  ];

  return (
    <Box className={styles.container}>
      <Header title="Dashboard" />
      <Box className={styles.card}>
        <Card
          title={"Entradas"}
          icon={<IconePagamento />}
          value={currencyMask(entries.toLocaleString())}
          type="entrada"
        />
        <Card
          title={"Saídas"}
          icon={<IconeSaida fontSize="large" className={styles.icon} />}
          value={currencyMask(expends.toLocaleString())}
          type="saida"
        />
        <Card
          title={"Total"}
          icon={<CalculateIcon fontSize="large" className={styles.icon} />}
          value={currencyMask(total)}
          type="total"
        />
      </Box>
      <Box className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit(handleAdd)}>
          <Box className={styles.textField}>
            <Stack spacing={2}>
              <CustomInput
                name="identificator"
                type="text"
                label="Identificação do valor"
                {...register("identificator", {
                  required: "O campo está em branco verifique!",
                })}
                error={!!errors?.identificator}
                helperText={errors.identificator?.message?.toString() || null}
              />
              <CustomInput
                name="value"
                label="Valor"
                {...register("value", {
                  required: "O campo está em branco verifique!",
                })}
                error={!!errors?.value}
                helperText={errors.value?.message?.toString() || null}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </Stack>
            <FormControlLabel
              control={
                <CustomSwitch
                  className={styles.checkbox}
                  {...register("expend")}
                />
              }
              label="Saída"
            />
          </Box>
          <Box className={styles.button}>
            <CustomButton
              size="large"
              endIcon={<AddCircleOutlineIcon />}
              loading={loading}
              type="submit"
            >
              Adicionar
            </CustomButton>
          </Box>
        </form>
        <Box className={styles.table}>
          <DataGrid
            rows={finances || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
