import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid grey',
    height: theme.spacing(6),
    marginBottom: theme.spacing(4),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 4),
  },
  iconButton: {
    background: 'linear-gradient(45deg, #303f9f, #7986cb)',
    color: 'white',
  },
  scheduleButton: {
    marginTop: theme.spacing(1),
    height: theme.spacing(6),
  },
  rootGrid: {
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const History = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const cancelHandler = async (id) => {
    setLoading(true);
    await currentUser.cancelBooking(id);
    window.location.reload();
  };

  const confirmHandler = (id) => {
    console.log(id);
  };

  useEffect(() => {
    if (currentUser) {
      const fetchBookings = async () => {
        setLoading(true);
        const data = await currentUser.getBookings();
        setBookings(data);
        setLoading(false);
      };
      fetchBookings();
    }
  }, [currentUser]);

  return (
    <React.Fragment>
      <Head>
        <title>Schedule</title>
      </Head>
      <AppBar color="inherit" elevation={0} style={{ alignItems: 'center' }}>
        <Toolbar>
          <Container>
            <Link href="/dashboard">
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
        {loading ? (
          <Grid container alignItems="center" className={classes.rootGrid}>
            <CircularProgress size={100} thickness={6} color="secondary" />
          </Grid>
        ) : (
          <Grid container className={classes.rootGrid}>
            {bookings.map((booking) => {
              if (
                moment(booking.startAt).format() > moment(new Date()).format()
              ) {
                return (
                  <Box className={classes.box} key={booking.id}>
                    {moment(booking.startAt).format('MMMM Do YYYY, HH:mm')}
                    <Button
                      color="secondary"
                      onClick={() => cancelHandler(booking.id)}
                    >
                      Cancel
                    </Button>
                  </Box>
                );
              } else {
                return (
                  <Box className={classes.box} key={booking.id}>
                    {moment(booking.startAt).format('MMMM Do YYYY, HH:mm')}
                    <Button
                      color="primary"
                      onClick={() => confirmHandler(booking.id)}
                    >
                      Confirm
                    </Button>
                  </Box>
                );
              }
            })}
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

export default History;
