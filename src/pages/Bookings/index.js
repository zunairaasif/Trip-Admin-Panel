import axios from "axios";
import { Grid, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import style from "./style";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${baseUrl}/bookings/booking`, { headers })
      .then((response) => {
        const booking = response.data.bookings;
        setBookings(booking);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [baseUrl]);

  return (
    <Layout>
      <Loader open={loading} />

      <Text variant="h3" text="List of all bookings" sx={style.heading} />

      <Grid container gap={2}>
        {bookings ? (
          bookings.map((booking, index) => (
            <Grid item container md={5.75} key={index} sx={style.block}>
              <Grid container item gap={1} md={5} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="User:" />
                  <Text
                    variant="body1"
                    text={booking.user ? booking.user.name : "null"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Booking:" />
                  <Text
                    variant="body1"
                    text={booking.booking ? booking.booking.name : "null"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Price:" />
                  <Text variant="body1" text={booking.price} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Number of seats:" />
                  <Text variant="body1" text={booking.noOfSeats} />
                </Box>
              </Grid>

              <Grid container item gap={1} md={6} sx={style.grid}>
                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Paid:" />
                  <Text
                    variant="body1"
                    text={booking.paid ? "true" : "false"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Amount Paid:" />
                  <Text variant="body1" text={booking.amountPaid} />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Booking Confirmed:" />
                  <Text
                    variant="body1"
                    text={booking.bookingConfirm ? "true" : "false"}
                  />
                </Box>

                <Box gap={2} sx={style.wrap}>
                  <Text variant="h5" text="Seat of Choice Price:" />
                  <Text variant="body1" text={booking.seatOfChoicePrice} />
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <NoData text="bookings" />
        )}
      </Grid>
    </Layout>
  );
};

export default Bookings;
