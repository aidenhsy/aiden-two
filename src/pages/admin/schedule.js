import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Head from 'next/head';
import Link from 'next/link';
import User from '../../models/User';
import Booking from '../../models/Booking';
import { useAuth } from '../../contexts/authContext';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';

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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchBookings = async () => {
        const data = await currentUser.getBookings();
        setBookings(data);
      };
      fetchBookings();
    }
  }, [currentUser, bookings]);

  const deleteHandler = async (bookingId) => {
    setLoading(true);
    await currentUser.deleteBooking(bookingId);
    const data = await currentUser.getBookings();
    setBookings(data);
    setLoading(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await currentUser.addBooking(moment(time).toISOString());
    setLoading(false);
  };
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AppBar color="inherit" elevation={0} style={{ alignItems: 'center' }}>
        <Toolbar>
          <Container>
            <Link href="/admin/dashboard">
              <Button
                disableRipple
                disableFocusRipple
                endIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Grid container className={classes.rootGrid} spacing={3}>
          <Grid item>
            <Typography variant="h5">Add new time slot?</Typography>
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
          <Divider />
          <Grid item>
            <Typography variant="h5">Class Schedule</Typography>
          </Grid>
          <Grid item>
            {loading ? (
              <Grid container justify="center">
                <CircularProgress size={100} thickness={6} color="secondary" />
              </Grid>
            ) : (
              <List>
                {bookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <ListItem>
                      <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                      >
                        <Typography>
                          {moment(booking.startAt).format(
                            'MMMM Do YYYY, HH:mm'
                          )}
                        </Typography>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteHandler(booking.id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
