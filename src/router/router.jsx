import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/RootLayout/AuthLayout";

import AllApartments from "../pages/AllApartments/AllApartments";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashBoardLayout from "../layouts/RootLayout/DashBoardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import MyProfile from "../pages/DashBoard/MyProfile/UserProfileAndAgreement";
import BookedApartments from "../pages/DashBoard/BookedApartments/BookedApartments";
import RentPaymentForm from "../pages/DashBoard/RentPaymentForm/RentPaymentForm";
import StripePaymentForm from "../pages/DashBoard/StripePaymentForm/StripePaymentForm";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import AdminDashboard from "../pages/DashBoard/AdminDashboard/AdminDashboard";
import MembersManagement from "../pages/DashBoard/MembersManagement/MembersManagement";
import MakeAnnouncement from "../pages/DashBoard/announcement/MakeAnnouncement";
import Announcements from "../pages/DashBoard/announcement/Announcements";
import CouponInput from "../pages/DashBoard/StripePaymentForm/CheckoutForm/CouponInput";
import CouponManagement from "../pages/DashBoard/CouponManagement/CouponManagement";
import InteractiveFloorPlan from "../pages/InteractiveFloorPlan/InteractiveFloorPlan";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allApartments",
        element: <AllApartments></AllApartments>,
        loader: () => fetch("https://builida-server.vercel.app/apartmentCount"),
      },
      {
        path: "/interactiveFloorPlan",
        Component: InteractiveFloorPlan,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashBoard/myProfile",
        Component: MyProfile,
      },
      {
        path: "/dashBoard/pendingBookings",
        Component: BookedApartments,
      },
      {
        Component: RentPaymentForm,
        path: "/dashBoard/rentPaymentForm",
      },
      {
        Component: StripePaymentForm,
        path: "/dashBoard/stripePaymentForm/:paymentId",
      },
      {
        Component: PaymentHistory,
        path: "/dashBoard/PaymentHistory",
      },
      {
        Component: AdminDashboard,
        path: "/dashBoard/adminDashBoard",
      },
      {
        Component: MembersManagement,
        path: "/dashBoard/membersManagement",
      },
      {
        Component: MakeAnnouncement,
        path: "/dashBoard/makeAnnouncement",
      },
      {
        Component: Announcements,
        path: "/dashBoard/announcements",
      },
      {
        Component: CouponManagement,
        path: "/dashBoard/couponManagement",
      },
    ],
  },
]);
