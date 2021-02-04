import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import StripeForm from '../components/StripeForm';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const useStyles = makeStyles((theme) => ({
  iconButton: {
    background: 'linear-gradient(45deg, #FE6BBB, #FF8E53)',
    color: 'white',
  },
  payButton: {
    marginTop: theme.spacing(2),
    height: theme.spacing(6),
    borderRadius: 20,
  },
  root: {
    height: '100vh',
  },
  rootGrid: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Purchase = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Purchase</title>
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
        <Grid container className={classes.rootGrid}>
          <Elements stripe={stripePromise}>
            <StripeForm />
          </Elements>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Purchase;
