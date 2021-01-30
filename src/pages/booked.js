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
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid grey',
    height: theme.spacing(6),
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
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
  '2021-02-01T11:00:00.000Z',
];

const History = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

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
          {/* {formattedTimes.map((time) => (
            <Grid item>
              <Button
                type="submit"
                color="primary"
                disabled
                className={classes.scheduleButton}
                variant="contained"
                onClick={clickHandler}
                fullWidth
              >
                {time.split(' ').slice(0, -6).join(' ')} @{' '}
                {time.split(' ')[4].slice(0, -3)}
              </Button>
            </Grid>
          ))} */}
          {times.map((time) => {
            if (new Date(time) > new Date()) {
              return <h1>{new Date(time).toString()}</h1>;
            }
          })}
          {times.map((time) => {
            if (new Date(time) < new Date()) {
              return <h2>{new Date(time).toString()}</h2>;
            }
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default History;
