import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserImg from "../../Media/User.jpeg";
import VerifiedLogo from "../../Media/verificationIcon.png";
import BatmanImage from "../../Media/Batman.jpg";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

const ReplyModel = ({handleClose , open}) => {

  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleSubmit = (values) => {
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      tweetId: 5,
    },
    onSubmit: handleSubmit,
  });

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              onClick={() => navigate(`/profile/${6}`)}
              className="cursor-pointer"
              alt="UserImage"
              src={UserImg}
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2">
                  <Typography
                    Wrap
                    sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
                    className="font-semibold"
                  >
                    <span>Manojit Malik</span>
                  </Typography>

                  <Typography variant="body2" className="text-gray-600">
                    <span>@i_mnog . 2m</span>
                  </Typography>
                  <img className="ml-2 w-5 h-5" src={VerifiedLogo} alt="" />
                </div>
              </div>
              <div className="mt-2" onClick={() => navigate(`/tweet/${3}`)}>
                <div className="cursor-pointer">
                  <p className="mb-2 p-0">
                    Keep Going for Twitter clone using ReactJS and SpringBoot.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
          <section className={`py-10`}>
              <div className="flex space-x-5">
                <Avatar alt="User Image" src={UserImg} />

                <div className="w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="content"
                        placeholder="What is happening?!"
                        className={`border-none outline-none text-xl bg-transparent`}
                        {...formik.getFieldProps("content")}
                      />
                      {formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      )}
                    </div>

                    {/* <div>
                            <img src="" alt="" />
                        </div> */}

                    <div className="flex justify-between items-center mt-5">
                      <div className="flex space-x-5 items-center">
                        <label className="flex item-center space-x-2 rounded-md coursor-pointer">
                          <ImageIcon className="text-[#1d9bf0]" />
                          <input
                            type="file"
                            name="imageFile"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                        </label>

                        <FmdGoodIcon className="text-[#1d9bf0]" />
                        <TagFacesIcon className="text-[#1d9bf0]" />
                      </div>

                      <div>
                        <Button
                          sx={{
                            width: "90%",
                            borderRadius: "20px",
                            paddingY: "8px",
                            paddingX: "20px",
                            bgcolor: "1e88e5",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
};

export default ReplyModel;
