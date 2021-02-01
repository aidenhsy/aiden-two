import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import User from '../../models/User';
import { useAuth } from '../../contexts/authContext';

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
  root: {
    minHeight: '80vh',
    flexGrow: 1,
    position: 'relative',
  },
  grid: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  list: {
    width: '100%',
    maxWidth: 360,
  },
  logoutButton: {
    borderRadius: 24,
    marginTop: theme.spacing(2),
    height: theme.spacing(6),
  },
  nav: {
    minHeight: '10vh',
    width: '100vw',
    background: 'black',
  },
  card: {
    height: '120px',
    width: '100%',
    borderRadius: 20,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      border: `5px solid ${theme.palette.primary.light}`,
    },
  },
  topGrid: {
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export default function TeacherDashboard() {
  const router = useRouter();
  const classes = useStyles();
  const { currentUser } = useAuth();
  const logoutHandler = async () => {
    try {
      await User.logout();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push('/');
  //   }
  // }, [currentUser]);

  // currentUser && console.log(currentUser);
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AppBar color="inherit" elevation={0} style={{ alignItems: 'center' }}>
        <Toolbar>
          <Container>
            <Button
              disableRipple
              disableFocusRipple
              endIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
      <Container maxWidth="sm" className={classes.root}>
        <Grid container className={classes.topGrid}>
          <Avatar
            alt="Remy Sharp"
            src="https://vercel.com/api/www/avatar/602eRYXVjKJb5BdmVvgbkIFt?&s=204"
            className={classes.avatar}
          />
          <Typography variant="h4" style={{ marginLeft: '2rem' }}>
            {currentUser && currentUser.displayName}
          </Typography>
        </Grid>
        <Grid container justify="center">
          <List className={classes.list}>
            <ListItem>
              <ListItemText>Current Hours:</ListItemText>
              <Typography>{currentUser && currentUser.hours}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>Next Class:</ListItemText>
              <Typography>Fri Jan 23th @ 17:00</Typography>
            </ListItem>
          </List>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              <Link href="/teacher/schedule">
                <Card raised className={classes.card} variant="elevation">
                  <Grid
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                    spacing={0}
                    style={{ height: '100%' }}
                  >
                    <Typography variant="h4">Schedule</Typography>
                  </Grid>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href="/book">
                <Card raised className={classes.card} variant="elevation">
                  <Grid
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                    spacing={0}
                    style={{ height: '100%' }}
                  >
                    <Typography variant="h4">Book</Typography>
                  </Grid>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href="/booked">
                <Card raised className={classes.card} variant="elevation">
                  <Grid
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                    spacing={0}
                    style={{ height: '100%' }}
                  >
                    <Typography variant="h4">Booked</Typography>
                  </Grid>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href="/settings">
                <Card raised className={classes.card} variant="elevation">
                  <Grid
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                    spacing={0}
                    style={{ height: '100%' }}
                  >
                    <Typography variant="h4">Settings</Typography>
                  </Grid>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.logoutButton}
                fullWidth
                color="secondary"
                onClick={logoutHandler}
              >
                Log out
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
