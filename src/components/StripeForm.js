import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  rootGrid: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const StripeForm = () => {
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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

    if (confirmCardPayment.paymentIntent.status === 'succeeded') {
      currentUser.buyHours(hours);
      router.push('/dashboard');
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Grid container justify="center">
          <CircularProgress size={100} thickness={6} color="secondary" />
        </Grid>
      ) : (
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
      )}
      <form onSubmit={paymentHandler} style={{ width: '100%' }}>
        <div style={{ marginTop: '5rem' }}>
          <CardElement options={cardElementOptions} />
        </div>
        <Button
          type="submit"
          color="secondary"
          disabled={loading && true}
          className={classes.payButton}
          variant="contained"
          fullWidth
        >
          Pay ${hours * 20}
        </Button>
      </form>
    </React.Fragment>
  );
};

export default StripeForm;
