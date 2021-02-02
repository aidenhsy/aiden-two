import React, { useState } from 'react';
import NextLink from 'next/link';
import User from '../models/User';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  rootGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user } = await User.register(email, password);
      const newUser = new User({
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        isTeacher: false,
        hours: 0,
      });
      await newUser.create();
      setCurrentUser(newUser);
      router.push('/dashboard');
    } catch (error) {
      console.log(error.message);
      setOpen(true);
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <AppBar color="inherit" elevation={0} style={{ alignItems: 'center' }}>
        <Toolbar>
          <Container>
            <NextLink href="/">
              <Button disableRipple disableFocusRipple endIcon={<HomeIcon />}>
                Home
              </Button>
            </NextLink>
          </Container>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        {loading ? (
          <Grid container className={classes.rootGrid}>
            <CircularProgress size={100} thickness={6} color="secondary" />
          </Grid>
        ) : (
          <Grid container className={classes.rootGrid}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                style={{ marginTop: '4rem' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  {message}
                </Alert>
              </Snackbar>
              <form className={classes.form} onSubmit={signupHandler}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="inherit"
                  className={classes.submit}
                >
                  login with google
                </Button>
              </form>
            </div>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  );
}
