import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

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
  return (
    <React.Fragment>
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
            <TextField variant="outlined" fullWidth />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              fullWidth
              disabled
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
