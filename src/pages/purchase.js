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
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/authContext';
import Link from 'next/link';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

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
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [hours, setHours] = useState(1);

  const stripe = useStripe();
  const elements = useElements();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '20px',
      },
    },
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/payment_intents', {
      amount: hours * 20 * 100,
    });
    const cardElement = elements.getElement(CardElement);
    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { email: currentUser.email },
    });
    const confirmCardPayment = await stripe.confirmCardPayment(data, {
      payment_method: paymentMethodReq.paymentMethod.id,
    });
    console.log(confirmCardPayment.paymentIntent.status, hours);
    //
    // if (confirmCardPayment.paymentIntent.status === 'succeeded') {
    //   await currentUser.refresh();
    //   currentUser.hours += hours;
    //   await currentUser.save();
    //   router.push('/dashboard');
    //   return;
    // }
    // do an if statement for status failed.
    // if (confirmCardPayment.paymentIntent.status === 'succeeded') {
    //   router.push('/booking');
    // }
  };

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
          <Grid container justify="space-between" alignItems="center">
            <IconButton
              aria-label="delete"
              onClick={() => {
                setHours(hours - 1);
              }}
              className={classes.iconButton}
            >
              <RemoveIcon fontSize="large" />
            </IconButton>
            <Typography variant="h4">{hours}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setHours(hours + 1);
              }}
              className={classes.iconButton}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Grid>
          <form onSubmit={paymentHandler} style={{ width: '100%' }}>
            <div style={{ marginTop: '5rem' }}>
              <CardElement options={cardElementOptions} />
            </div>
            <Button
              type="submit"
              color="secondary"
              className={classes.payButton}
              variant="contained"
              fullWidth
            >
              Pay ${hours * 20}
            </Button>
          </form>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Purchase;
