import React from "react";
import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import FloatingCoupons from "./FloatingCoupons/FloatingCoupons";
import LocationAndDirections from "./Location/LocationAndDirections";
import Footer from "../shared/Footer/Footer";
import InteractiveFloorPlan from "../InteractiveFloorPlan/InteractiveFloorPlan";
import CommentSlider from "./CommentSlider/CommentSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <FloatingCoupons></FloatingCoupons>
      <LocationAndDirections></LocationAndDirections>
      <CommentSlider></CommentSlider>
      <Footer></Footer>
    </div>
  );
};

export default Home;
