import {
  Box,
  Grid,
  Radio,
  Button,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/Alert";

const AddTicket = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedTrip, setSelectedTrip] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    gender: "",
    tripId: "",
    price: "",
    seatOfChoicePrice: "",
    noOfSeats: "",
    amountPaid: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/trips/trip`)
      .then((response) => {
        const trip = response.data.trips;

        setTrips(trip);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleTripChange = (tripId) => {
    setSelectedTrip(tripId);
  };

  const handleAddTrip = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const postData = {
      ...formData,
      tripId: selectedTrip,
    };

    axios
      .post(`${baseUrl}/tickets/addTicket`, postData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Ticket added successfully:", response.data);
          setLoading(false);
          navigate("/tickets");
        } else {
          console.error("Error:", response.data);
          setLoading(false);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error posting:", error);
        setLoading(false);
        setOpenSnackbar(true);
      });
  };

  return (
    <Layout>
      <Loader open={loading} />
      <AlertMessage
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity="error"
        text="Error adding a new ticket!"
      />

      <Text variant="h3" text="Add a new ticket" sx={style.heading} />

      <Grid container sx={style.display}>
        <Grid container item gap={3} md={5} sx={style.grid}>
          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter user" />
            <TextField
              size="small"
              value={formData.name}
              onChange={handleInputChange("name")}
            />
          </Box>

          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter phone number" />
            <TextField
              size="small"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
            />
          </Box>

          <Box gap={2}>
            <Text variant="h5" text="Select trip:" />
            <FormControl component="fieldset">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {trips?.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value._id}
                    control={
                      <Radio onChange={() => handleTripChange(value._id)} />
                    }
                    label={value.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>

        <Grid container item gap={3} md={5.75} sx={style.grid}>
          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter gender" />
            <TextField
              size="small"
              value={formData.gender}
              onChange={handleInputChange("gender")}
            />
          </Box>

          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter price" />
            <TextField
              size="small"
              value={formData.price}
              onChange={handleInputChange("price")}
            />
          </Box>

          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter no. of seats" />
            <TextField
              size="small"
              value={formData.noOfSeats}
              onChange={handleInputChange("noOfSeats")}
            />
          </Box>

          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter amount paid" />
            <TextField
              size="small"
              value={formData.amountPaid}
              onChange={handleInputChange("amountPaid")}
            />
          </Box>

          <Box gap={2} sx={style.wrap}>
            <Text variant="h5" text="Enter seat of choice price" />
            <TextField
              size="small"
              value={formData.seatOfChoicePrice}
              onChange={handleInputChange("seatOfChoicePrice")}
            />
          </Box>
        </Grid>
      </Grid>

      <Button variant="contained" sx={style.addBtn} onClick={handleAddTrip}>
        <Text variant="body2" text="Add Ticket" />
      </Button>
    </Layout>
  );
};

export default AddTicket;
