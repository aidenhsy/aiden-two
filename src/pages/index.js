import React, { useLayoutEffect } from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
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
  const router = useRouter();
  const { currentUser } = useAuth();

  useLayoutEffect(() => {
    if (currentUser && currentUser.email) {
      router.push('/dashboard');
    }
  }, [currentUser]);

  const classes = useStyles();

  return (
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
  );
};

export default Home;
