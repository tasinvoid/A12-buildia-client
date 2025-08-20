import React from "react";
import Banner from "./Banner/Banner";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import FloatingCoupons from "./FloatingCoupons/FloatingCoupons";
import LocationAndDirections from "./Location/LocationAndDirections";
import Footer from "../shared/Footer/Footer";
import InteractiveFloorPlan from "../InteractiveFloorPlan/InteractiveFloorPlan";
import CommentSlider from "./CommentSlider/CommentSlider";
import Facilities from "./Facilities/Facilities";
import TeamSection from "./TeamSection/TeamSection";
import EmailForm from "./EmailForm/EmailForm";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <FloatingCoupons></FloatingCoupons>
      <LocationAndDirections></LocationAndDirections>
      <CommentSlider></CommentSlider>
      <Facilities></Facilities>
      <EmailForm></EmailForm>
      <TeamSection></TeamSection>
      <Footer></Footer>
    </div>
  );
};

export default Home;
