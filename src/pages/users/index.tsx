import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import jwt_decode from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { api } from "../../services/api";
import { CustomButton } from "./../../components/CustomButton";
//@ts-ignore
import styles from "./styles.module.scss";

const User = () => {
  const [users, setUsers] = useState<[any]>();
  const [userRule, setUserRule] = useState();
  const cookie = parseCookies(undefined, "authorization_token");
  const decoded: any = jwt_decode(cookie.authorization_token);

  console.log(decoded.authorities.toString());

  const navigate = useNavigate();

  async function getUsers() {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = await api.get("users", {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });

    const allUsers = response.data;

    const allUserRules = allUsers.map((userRole) => userRole.rules);

    setUsers(allUsers);

    setUserRule(allUserRules);
  }

  useEffect(() => {
    getUsers();
  }, []);

  function reloadPage() {
    window.location.reload();
  }

  async function handleDelete(row) {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = api.delete(`users/${row.id}`, {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });
    alert("O usuário foi excluído com sucesso");
    setTimeout(function () {
      reloadPage();
    }, 100);
  }

  const adminColumns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "username", headerName: "Email", width: 300 },
    { field: "rules", headerName: "Tipo de usuário", width: 300 },
    {
      field: "Excluir",
      renderCell: (cellValues) => {
        const datGridValue = cellValues.row.id;
        return (
          <IconButton
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => handleDelete(cellValues.row)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 130,
    },
  ];

  const userColumns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "username", headerName: "Email", width: 300 },
    { field: "rules", headerName: "Tipo de usuário", width: 300 },
  ];

  return (
    <Box>
      <Header />
      <Box className={styles.container}>
        <Box className={styles.title}>
          <Typography
            variant="h4"
            className={styles.typography}
            sx={{ fontWeight: "bold" }}
          >
            Usuários
          </Typography>
        </Box>
        <Box className={styles.table}>
          {decoded.authorities.toString() === "COMMON_CLIENT" ? (
            <DataGrid
              rows={users || []}
              columns={userColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          ) : decoded.authorities.toString() === "ADMINISTRATOR" ? (
            <DataGrid
              rows={users || []}
              columns={adminColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          ) : (
            <></>
          )}
        </Box>
        <Box className={styles.newUser}>
          <Box>
            <CustomButton
              onClick={() => navigate("/newUsers")}
              endIcon={
                <PersonAddOutlinedIcon
                  sx={{
                    marginBottom: "0.250rem",
                    marginRight: "0.250rem",
                  }}
                />
              }
              className={styles.button}
            >
              Novo Usuário
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
