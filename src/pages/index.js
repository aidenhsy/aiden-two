import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/authContext';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loader: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  loaderContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    height: '100vh',
  },
  styledButton: {
    background: 'linear-gradient(45deg, #FE6BBB, #FF8E53)',
    border: 0,
    borderRadius: 30,
    color: 'white',
    height: theme.spacing(8),
    marginBottom: theme.spacing(4),
    padding: '5px 30px',
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const { currentUser } = useAuth();

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.email) {
      router.push('/dashboard');
    } else {
      setChecked(true);
    }
  }, [currentUser]);

  if (checked === false)
    return (
      <div className={classes.loaderContainer}>
        <CircularProgress thickness={6} size={100} className={classes.loader} />
      </div>
    );

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <Container maxWidth="sm" className={classes.root}>
        <Grid container className={classes.gridContainer}>
          <Link href="/login">
            <Button
              color="secondary"
              className={classes.styledButton}
              fullWidth
              variant="contained"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              color="secondary"
              className={classes.styledButton}
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
          </Link>
        </Grid>
      </Container>
      )
    </React.Fragment>
  );
};

export default Home;
