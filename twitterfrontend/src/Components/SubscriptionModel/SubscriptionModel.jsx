import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedLogo from "../../Media/verificationIcon.png";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  borderRadius: 4,
};

const features = [
    "Prioritize rankings in conversations and search.",
    "See aproximately twice as many Tweets between ads in your For you and Following timelines.",
    "Add bold and italic texts in your tweets",
    "Post longer videos and enabled 1080p60 video quality uploads ",
    "All the existing verified features, including edit tweet, bookmark folders, and early access you new features."
];

const SubscriptionModal = ({open, handleClose}) => {

  const [plan, setPlan] = React.useState("Annually");



  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="delete">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between bg-slate-300 shadow-lg">
                <h1 className="text-xl pr-5">
                  Subscribe to unlock new feature, verified logo will be added
                  to your Profile.
                </h1>
                <img className="w-24 h-24" src={VerifiedLogo} alt="" />
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 border border-gray-500">
                <div>
                  <span
                    onClick={() => setPlan("Annually")}
                    className={`${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">SAVE 12%</span>
                </div>
                <p
                  onClick={() => setPlan("monthly")}
                  className={`${
                    plan === "monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                >
                  Monthly
                </p>
              </div>

              <div className="space-y-3">
                {features.map((item)=><div className="flex items-center space-x-5">
                  <FiberManualRecordIcon sx={{width:"7px", height:"7px"}} />
                  <p className="text-xs">{item}</p>
                </div>)}

              </div>

              <div className="cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3">
                <span className="line-through italic">₹7,700.00</span>
                <span className="px-5">₹6,800.00</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubscriptionModal;
