import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModel/SubscriptionModel";

const RightPart = () => {
  const [openSubscriptionModel, setOpenSubscriptionModel] = React.useState(false);
  const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
  const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);

  const handleChangeTheme = () => {
    console.log("Handle Theme Change");
  };

  return (
    <div className="py-5 sticky top">
      <div className="relative flex items-center">
        <input
          type="text"
          label="Search"
          className="py-3 rounded-full text-gray-500 w-full pl-12 border-2"
        />

        <div className="absolute top-0 left-0  pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>

      <section className="my-5 border-2 border-gray-200 rounded-lg p-5">
        <h1 className="flex justify-starttext-xl font-bold">Get Verified</h1>
        <h1 className="flex justify-start font-bold my-2">Subscribe to Unlock new Features</h1>
        <div className="flex justify-start">
        <Button 
          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          onClick={handleOpenSubscriptionModel }
        >
          Get Verified
        </Button>
        </div>
        
      </section>

      <section className="mt-7 space-y-5 border-2 border-gray-200 rounded-lg p-5">
        <h1 className="flex justify-start font-bold text-xl py-1 ">What's happening</h1>


        <div className="flex justify-between w-full">
            <div>
              <p>FIFA Women's World Cup · LIVE</p>
              <p className="flex justify-start font-bold">Philipines vs Switzerland</p>
            </div>
            <MoreHorizIcon />
          </div>

        {[1, 1, 1].map((item) => (
          <div className="flex justify-between w-full">
            <div>
              <p>Entertainment · Trending</p>
              <p className="flex justify-start font-bold">#TheMarvels</p>
              <p className="flex justify-start">76.8k Tweets</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>
      <section>
        <SubscriptionModal open={openSubscriptionModel} handleClose={handleCloseSubscriptionModel} />
      </section>
    </div>
  );
};

export default RightPart;
