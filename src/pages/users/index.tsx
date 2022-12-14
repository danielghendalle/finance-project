import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography
} from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import jwt_decode from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput";
import Header from "../../components/header/Header";
import { api } from "../../services/api";
import { CustomButton } from "./../../components/CustomButton";
//@ts-ignore
import styles from "./styles.module.scss";

const User = () => {
  useEffect(() => {
    document.title = "Finances | Usuários";
  }, []);

  const [users, setUsers] = useState<[any]>();
  const [commonUsers, setCommonUsers] = useState();
  const [rowId, setRowId] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [userType, setUserType] = useState<any>();
  const cookie = parseCookies(undefined, "authorization_token");
  const decoded: any = jwt_decode(cookie.authorization_token);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function getUsers() {
    const response = await api.get("users", {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });

    const allUsers = response.data;

    const commonUsers = allUsers.filter(
      (commonUser) => commonUser.rules.toString() === "COMMON_CLIENT"
    );

    setUsers(allUsers);

    setCommonUsers(commonUsers);
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

  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  function handleOpenAdminModal(row: any) {
    setRowId(row.id);
    setEmail(row.username);
    setUserType(row.rules);
    return setOpenAdminModal(true);
  }

  function handleOpenUserModal(row: any) {
    setRowId(row.id);
    setEmail(row.username);
    return setOpenUserModal(true);
  }
  function handleCloseAdminModal() {
    return setOpenAdminModal(false);
  }

  function handleCloseUserModal() {
    return setOpenUserModal(false);
  }

  const adminColumns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "username", headerName: "Email", width: 300 },
    { field: "rules", headerName: "Tipo de usuário", width: 300 },
    {
      field: "Editar",
      renderCell: (cellValues) => {
        const dataGridValue = cellValues;
        return (
          <IconButton
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => handleOpenAdminModal(dataGridValue.row)}
          >
            <EditIcon />
          </IconButton>
        );
      },
      width: 130,
    },
    {
      field: "Excluir",
      renderCell: (cellValues) => {
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
    {
      field: "Editar",
      renderCell: (cellValues) => {
        const dataGridValue = cellValues;
        return (
          <IconButton
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => handleOpenUserModal(dataGridValue.row)}
          >
            <EditIcon />
          </IconButton>
        );
      },
      width: 130,
    },
  ];

  function handleSubmitAdminModal(data) {
    const response = api
      .put(
        `/users/${rowId}`,
        {
          username: data.email,
          password: data.password,
          rules: data.userType,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.authorization_token}`,
          },
        }
      )
      .then((response) => {
        return alert("Sucesso ao atualizar o usuário !");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert(`O nome de usuário já existe, tente outro.`);
        } else {
          alert(`Erro ao cadastrar usuário, código: ${err.response.status}`);
        }
      });
  }
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
              rows={commonUsers || []}
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
      <Modal
        className={styles.adminModal}
        open={openAdminModal}
        onClose={handleCloseAdminModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.adminModalContainer}>
          <form
            className={styles.adminModalForm}
            onSubmit={handleSubmit(handleSubmitAdminModal)}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              className={styles.adminModalTypography}
            >
              Editar Usuário
            </Typography>
            <Box className={styles.adminModalInputContainer}>
              <CustomInput
                id="id"
                disabled
                className={styles.adminIdInput}
                label="Id"
                defaultValue={rowId}
              />
              <CustomInput
                id="email"
                type="email"
                label="Email"
                defaultValue={email}
                {...register("email")}
              />
              <CustomInput
                type="password"
                label="Senha"
                {...register("password")}
              />
              <FormControl>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: purple[500],
                    },
                  }}
                >
                  Tipo de usuário
                </InputLabel>
                <Select
                  label="Tipo de usuário"
                  sx={{
                    "& fieldset": {
                      borderColor: grey[200],
                    },
                    "&:hover": {
                      "&& fieldset": {
                        border: "1px solid #800080",
                        transition: ".3s ease",
                      },
                    },

                    "&.Mui-focused": {
                      "&& fieldset": {
                        border: "1px solid #800080",
                      },
                    },
                  }}
                  defaultValue={userType}
                  {...register("userType")}
                >
                  <MenuItem value={"ADMINISTRATOR"}>ADMINISTRATOR</MenuItem>
                  <MenuItem value={"COMMON_CLIENT"}>COMMON_CLIENT</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={styles.adminModalButtonContainer}>
              <CustomButton
                className={styles.button}
                onClick={() => handleCloseAdminModal()}
              >
                Cancelar
              </CustomButton>
              <CustomButton
                className={styles.button}
                endIcon={<PersonAddOutlinedIcon />}
                loadingPosition="end"
                type="submit"
              >
                Concluir
              </CustomButton>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal
        className={styles.userModal}
        open={openUserModal}
        onClose={handleCloseUserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.userModalContainer}>
          <form
            className={styles.userModalForm}
            onSubmit={handleSubmit(handleSubmitAdminModal)}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              className={styles.userModalTypography}
            >
              Editar Usuário
            </Typography>
            <Box className={styles.userModalInputContainer}>
              <CustomInput
                id="id"
                disabled
                label="Id"
                className={styles.userIdInput}
                defaultValue={rowId}
              />
              <CustomInput
                type="email"
                label="Email"
                defaultValue={email}
                {...register("email")}
              />             
              <CustomInput
                type="password"
                label="Senha"
                {...register("password")}
              />
            </Box>
            <Box className={styles.userModalButtonContainer}>
              <CustomButton
                className={styles.button}
                onClick={() => handleCloseUserModal()}
              >
                Cancelar
              </CustomButton>
              <CustomButton
                className={styles.button}
                endIcon={<PersonAddOutlinedIcon />}
                loadingPosition="end"
                type="submit"
              >
                Concluir
              </CustomButton>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default User;
