import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import moment from 'moment';
import Booking from '../models/Booking';
import { useAuth } from '../contexts/authContext';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    background: 'linear-gradient(45deg, #303f9f, #7986cb)',
    color: 'white',
  },
  scheduleButton: {
    marginTop: theme.spacing(2),
    height: theme.spacing(6),
  },
  root: {
    height: '90vh',
  },
  rootGrid: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Schedule = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [availabilities, setAvailabilites] = useState([]);

  useEffect(() => {
    const fetchAvails = async () => {
      const data = await Booking.getAvailabilities();
      setAvailabilites(data);
    };
    fetchAvails();
  }, []);

  console.log(availabilities);

  const clickHandler = () => {
    console.log('clicked');
  };

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
      <Container maxWidth="xs" className={classes.root}>
        <Grid container className={classes.rootGrid} spacing={2}>
          {availabilities.map((avail) => (
            <Grid item>
              <Button
                type="submit"
                color="primary"
                className={classes.scheduleButton}
                variant="contained"
                onClick={clickHandler}
                fullWidth
              >
                {moment(avail.startAt).format('MMMM Do YYYY, HH:mm')}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Schedule;
