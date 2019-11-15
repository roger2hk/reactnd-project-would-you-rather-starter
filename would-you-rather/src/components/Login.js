import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { setAuthedUser } from "../actions/authedUser";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

class Login extends Component {
  state = {
    user: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ user: event.target.value });
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.user));

    const urlParams = new URLSearchParams(this.props.location.search);
    const key = urlParams.get("return-url");
    if (key && key !== "/login" && key !== "/logout") {
      this.props.history.push(key);
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Would You Rather
          </Typography>
          {this.props.users.length === 0 && (
            <Typography component="p">Loading user accounts...</Typography>
          )}
          {this.props.users.length > 0 && (
            <Fragment>
              <Typography component="p">Select an account to login.</Typography>
              <FormControl>
                <InputLabel shrink id="select-placeholder-label-user">
                  User
                </InputLabel>

                <Select
                  labelId="select-placeholder-label-user"
                  id="select-placeholder-user"
                  value={this.state.user}
                  onChange={this.handleChange}
                  autoWidth={true}
                  displayEmpty={false}
                  style={{ minWidth: 150 }}
                >
                  {this.props.users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText>
                  {this.props.users
                    .filter(user => user.id === this.state.user)
                    .map(
                      user =>
                        user.questions.length +
                        " Questions & " +
                        Object.keys(user.answers).length +
                        " Answers"
                    )}
                </FormHelperText>
              </FormControl>
            </Fragment>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleLogin}
              disabled={!this.state.user}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: Object.values(users)
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
