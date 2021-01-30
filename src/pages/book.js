import Head from 'next/head';
import axios from 'axios';
import React, { useState } from 'react';
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
import { useAuth } from '../contexts/authContext';
import Link from 'next/link';

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

const times = [
  '2021-01-26T10:00:00.000Z',
  '2021-01-26T11:00:00.000Z',
  '2021-01-27T11:00:00.000Z',
  '2021-01-28T11:00:00.000Z',
  '2021-01-29T11:00:00.000Z',
];
const formattedTimes = times.map((time) => new Date(time).toString());

const Schedule = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const clickHandler = () => {
    console.log('clicked');
  };

  console.log(formattedTimes[0]);

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
          {formattedTimes.map((time) => (
            <Grid item>
              <Button
                type="submit"
                color="primary"
                className={classes.scheduleButton}
                variant="contained"
                onClick={clickHandler}
                fullWidth
              >
                {time.split(' ').slice(0, -6).join(' ')} @{' '}
                {time.split(' ')[4].slice(0, -3)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Schedule;
