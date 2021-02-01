import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
  root: {
    height: '100vh',
  },
  rootGrid: {
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: '100%',
  },
  button: {
    height: theme.spacing(6),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser && currentUser.displayName
  );

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
      <Container className={classes.root} maxWidth="xs">
        <Grid container className={classes.rootGrid} spacing={4}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="https://vercel.com/api/www/avatar/602eRYXVjKJb5BdmVvgbkIFt?&s=204"
              className={classes.avatar}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              name="displayName"
              label="Display Name"
              id="displayName"
              variant="outlined"
              fullWidth
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              fullWidth
              disabled={displayName === null ? true : false}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          fullWidth
        >
          Delete account
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default Settings;
