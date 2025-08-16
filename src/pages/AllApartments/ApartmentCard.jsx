import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";

import {
  FiMapPin,
  FiHome,
  FiDollarSign,
  FiTag,
  FiMaximize,
  FiCalendar,
} from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 600 },
  bgcolor: "#1F2937",
  borderRadius: "12px",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.6)",
  p: 4,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxHeight: "90vh",
  overflowY: "auto",
  border: "1px solid #374151",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#111827",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#6B7280",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#9CA3AF",
  },
};

const ApartmentCard = ({ apartment }) => {
  const { ApartmentImage, ApartmentNo, BlockName, FloorNo, Rent, _id } =
    apartment;
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  console.log(user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    setOpen(false);
    const userData = {
      apartmentId: _id,
      userName: user.displayName,
      userEmail: user.email,
      status: "pending",
    };
    const res = await axiosSecure.patch("/addUserData", userData);
    console.log(res.data);
    if (res.data.modifiedCount === 1) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Applied",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...Already Applied ",
        text: "You have already applied for an apartment!. Please wait for the approval",
      });
    }
    return res.data;
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#1F2937",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.4)",
        margin: 2,
        borderRadius: "12px",
      }}
      className="w-80"
    >
      <CardActionArea onClick={handleOpen} disableRipple>
        <CardMedia
          component="img"
          height="180"
          image={ApartmentImage}
          alt={`Apartment ${ApartmentNo}`}
          sx={{ objectFit: "cover" }}
          className="h-50"
        />
        <CardContent
          sx={{
            backgroundColor: "#111827",
            color: "#D1D5DB",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#F3F4F6",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FiHome style={{ color: "#818CF8" }} />
            <div>
              Apartment: {ApartmentNo}
            </div>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#9CA3AF" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FiMapPin style={{ color: "#9CA3AF" }} /> Block: {BlockName}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Floor: {FloorNo}
            </div>
            {_id && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                ID: {_id}
              </div>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#111827",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#818CF8",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FiDollarSign style={{ color: "#818CF8" }} /> Rent: ${Rent}
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#4F46E5",
            color: "#F3F4F6",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#4F46E5",
              boxShadow: "none",
            },
            boxShadow: "none",
          }}
          onClick={handleOpen}
          disableRipple
        >
          Agreement
        </Button>
      </CardActions>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="apartment-details-modal-title"
        aria-describedby="apartment-details-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="apartment-details-modal-title"
            variant="h5"
            component="h2"
            sx={{
              color: "#818CF8",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: 1,
              borderBottom: "1px solid #374151",
            }}
          >
            Apartment Details: {ApartmentNo}
          </Typography>

          <CardMedia
            component="img"
            height="250"
            image={ApartmentImage}
            alt={`Apartment ${ApartmentNo}`}
            sx={{ objectFit: "cover", borderRadius: "8px" }}
          />

          <Typography
            id="apartment-details-modal-description"
            sx={{ mt: 2, color: "#D1D5DB" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                fontWeight: "bold",
                color: "#F3F4F6",
              }}
            >
              <FiHome style={{ color: "#818CF8", fontSize: "1.2rem" }} />
              Apartment: {ApartmentNo}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <FiTag style={{ color: "#9CA3AF" }} />
              **ID:** {_id || "N/A"}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <FiMapPin style={{ color: "#9CA3AF" }} />
              **Block Name:** {BlockName}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <FiMaximize style={{ color: "#9CA3AF" }} />
              **Floor No:** {FloorNo}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <FiDollarSign style={{ color: "#818CF8", fontSize: "1.2rem" }} />
              **Monthly Rent:** ${Rent}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <FiCalendar style={{ color: "#9CA3AF" }} />
              **Availability:** Immediate
            </div>

            <Typography
              variant="body1"
              sx={{ mt: 3, color: "#D1D5DB", lineHeight: 1.6 }}
            >
              This spacious apartment offers a comfortable living experience
              with modern amenities. Located in a quiet neighborhood, it's
              perfect for families or individuals seeking a peaceful
              environment.
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                mt: 3,
                width: "100%",
                backgroundColor: "#4F46E5",
                color: "#F3F4F6",
                "&:hover": {
                  backgroundColor: "#4F46E5",
                  boxShadow: "none",
                },
                boxShadow: "none",
                padding: "10px 0",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
              disableRipple
            >
              Confirm
            </Button>
            <IconButton
              onClick={() => setOpen(false)}
              aria-label="close modal"
              sx={{ color: "#9CA3AF", position: "absolute", top: 8, right: 8 }}
            >
              <IoMdClose />
            </IconButton>
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};

export default ApartmentCard;