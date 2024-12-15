import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useLocation, useNavigate } from "react-router-dom";
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { Button, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none"
};

export default function AuthModel({ open, handleClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const path = window.location.pathname === "/signin" ? "/signup" : "/signin";
    navigate(path);
  };

  const handleModalClose = () => {
    handleClose(); // Close the modal
    navigate('/'); // Navigate back to the default route
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleModalClose}
          >
            <CloseIcon />
          </IconButton>
          <h1 className='text-center font-bold text-3xl pb-20'>
          {location.pathname === "/signup" ? "Create your account" : "Sign in to X"}
          </h1>
          {location.pathname === "/signup" ? <SignupForm /> : <SigninForm />}
          <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
            {location.pathname === "/signup" ? "Already have an Account" : "If you don't have an account"}
          </h1>
          <Button
            fullWidth
            variant='outlined'
            onClick={handleNavigate}
            sx={{ borderRadius: "29px", py: "15px" }}
          >
            {window.location.pathname === "/signup" ? "sign in" : "sign up"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
