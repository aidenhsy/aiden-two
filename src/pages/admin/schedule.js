import React, { useState } from 'react';
import moment from 'moment';
import User from '../../models/User';
import Booking from '../../models/Booking';
import { useAuth } from '../../contexts/authContext';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  rootGrid: {
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textField: {
    width: '100%',
  },
}));

// currentUser.bookings = await Booking.getBooking(currentUser.bookings);
// console.log(await Booking.getBooking(currentUser.bookings));

export default function TeacherSchedule() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [time, setTime] = useState(
    moment(new Date()).format().substring(0, 16)
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    await currentUser.addBooking(moment(time).toISOString());
  };
  return (
    <Container maxWidth="xs">
      <Grid container className={classes.rootGrid} spacing={3}>
        <Grid item>
          <Typography variant="h5">When are you free?</Typography>
        </Grid>
        <Grid item>
          <form className={classes.container} onSubmit={submitHandler}>
            <TextField
              id="datetime-local"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
              fullWidth
            >
              Add
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
