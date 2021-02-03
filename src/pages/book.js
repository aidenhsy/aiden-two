import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  scheduleButton: {
    height: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  rootGrid: {
    height: '80vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Schedule = () => {
  const classes = useStyles();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [availabilities, setAvailabilites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAvails = async () => {
      setLoading(true);
      const data = await Booking.getAvailabilities();
      setAvailabilites(data);
      setLoading(false);
    };
    fetchAvails();
  }, []);

  const clickHandler = async (id) => {
    setLoading(true);
    await currentUser.book(id);
    router.push('/dashboard');
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
      <Container maxWidth="xs">
        {loading ? (
          <Grid container className={classes.rootGrid}>
            <CircularProgress size={100} thickness={6} color="secondary" />
          </Grid>
        ) : (
          <Grid container className={classes.rootGrid} spacing={2}>
            {availabilities.map((avail) => (
              <Button
                type="submit"
                color="primary"
                className={classes.scheduleButton}
                variant="contained"
                key={avail.id}
                onClick={() => clickHandler(avail.id)}
                fullWidth
              >
                {moment(avail.startAt).format('MMMM Do YYYY, HH:mm')}
              </Button>
            ))}
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Schedule;
