import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoginBg from "../../Media/LoginBg.png";
import XLogoSvg from "../../Media/XLogo.svg";
import { GoogleLogin } from "@react-oauth/google";
import AuthModal from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleOpenAuthModel = (path) => {
    setOpenAuthModel(true);
    navigate(path); // Navigate to the desired route
  };

  const handleCloseAuthModel = () => {
    setOpenAuthModel(false);
    navigate('/'); // Navigate back to home or default route
  };

  return (
    <div>
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img 
            className="w-full h-screen" 
            src={LoginBg}
            alt=""
          />
          <div className="absolute top-[26%] left-[19%]">
            <img
              height="300"
              width="300"
              viewBox="0 0 24 24"
              aria-hidden="true"
              src={XLogoSvg}
              alt="Twitter's Logo in SVG Format"
            />
          </div>
        </Grid>

        <Grid className="px-10" lg={5} xs={12}>
          <h1 className="font-bold text-7xl mt-10">Happening Now</h1>
          <h1 className="font-bold text-3xl py-16">Join Twitter Today</h1>

          <div className="w-[60%]">
            <div className="w-full">
              <GoogleLogin 
                onSuccess={(credentialResponse) => console.log(credentialResponse)} 
                onError={() => console.error("Login Failed")}
                width={330}
              />
              <p className="py-5 text-center">OR</p>

              <Button
                onClick={() => handleOpenAuthModel('/signup')} // Pass the path
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px"
                }}
              >
                Create Account
              </Button>

              <p className="text-sm mt-2">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
            </div>

            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">Already Have Account?</h1>
              <Button
                onClick={() => handleOpenAuthModel('/signin')} // Pass the path
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px"
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
