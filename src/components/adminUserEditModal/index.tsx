import { Box, Modal, Typography } from "@mui/material";

interface modalProps{
    open: boolean;
    handleClose: () => any;
}

const AdminUserEditModal = ({open, handleClose} : modalProps) => {
  return (
    <Modal
    open={ open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  </Modal>
  )
}

export default AdminUserEditModal