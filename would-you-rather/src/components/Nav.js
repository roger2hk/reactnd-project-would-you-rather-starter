import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  }
});

class Nav extends Component {
  render() {
    const { classes, user } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Would You Rather
          </Typography>
          <Button
            color="inherit"
            component={NavLink}
            to="/"
            exact
            activeClassName="active"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/add"
            exact
            activeClassName="active"
          >
            New Question
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/leaderboard"
            exact
            activeClassName="active"
          >
            Leaderboard
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/logout"
            exact
            activeClassName="active"
          >
            Logout
          </Button>
          <Avatar
            key={user.id}
            alt={user.name}
            src={user.avatarURL}
            className={classes.avatar}
          />
          <Typography>{user.name}</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser]
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Nav));
