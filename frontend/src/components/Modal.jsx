import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const nav= useNavigate()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleLogout(){
    localStorage.removeItem("token");
    nav("/")
    toast.success("Logout successfully")

  }
  return (
    <div className="text-white my-auto">
      <Button variant="contained" onClick={handleOpen}   sx={{ 
    backgroundColor: 'white',
    marginRight: '20px', 
    color: 'blue', 
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white' 
    }
  }}>Logout</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to logout?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You will be required to enter your credentials again to access your
            account. Please confirm if you wish to proceed with logging out.
          </Typography>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              onClick={handleLogout}
              color="primary" 
          
              sx={{ marginRight: 1 }}
            >
              Yes
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
