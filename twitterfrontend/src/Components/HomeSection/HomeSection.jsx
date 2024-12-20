import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserImg from "../../Media/User.jpeg";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { createTweet, getAllTweets } from "../../Store/Tweet/Action";
import { uploadToCloudnary } from "../../Utils/uploadToCloudnary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {

  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const dispatch = useDispatch();
  const { tweet } = useSelector(store=>store);
  const { auth } = useSelector((store) => store);

  console.log("tweet", tweet)
  
  useEffect(()=>{
    dispatch(getAllTweets())
  },[tweet.like, tweet.retweet])

  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    setSelectedImage("");
    console.log("values", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isTweet:true
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    // const imgUrl = event.target.files[0];
    const imgUrl = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar alt="User Image" src={auth.user?.image} />

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
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>

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
            <div>
              {selectedImage && <img className="mt-2" src={selectedImage} alt="to upload"/>}
            </div>
          </div>
        </div>
      </section>
      <hr className="mt-5"/>
      <section className="py-5">
        {tweet.tweets.map((item) => <TweetCard item={item} /> )}
      </section>
    </div>
  );
};

export default HomeSection;
