import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Paper,
  Typography,
  Divider,
  CardContent
} from "@material-ui/core";

const styles = theme => ({
  root: {
    background: "#eeeeee",
    minHeight: "100vh",
    padding: theme.spacing(0),
    textAlign: "center"
  },
  box: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 2, 0),
    background: "white"
  },
  userBox: {
    margin: theme.spacing(0, 0, 1, 0)
  },
  userCard: {
    padding: theme.spacing(2),
    display: "inline-block"
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
});

class Leaderboard extends Component {
  sortUserByScore = (u1, u2) =>
    this.getScoreFromUser(u2) - this.getScoreFromUser(u1);

  getScoreFromUser = user =>
    user.questions.length + Object.keys(user.answers).length;

  render() {
    const { classes, users } = this.props;

    return (
      <Paper className={classes.root}>
        <Box className={classes.box}>
          <Typography variant="h5" component="h3">
            Leaderboard
          </Typography>
        </Box>
        {Object.values(users)
          .sort(this.sortUserByScore)
          .map(user => (
            <Box key={user.id} className={classes.userBox}>
              <Card className={classes.userCard}>
                <CardHeader
                  avatar={<Avatar alt={user.name} src={user.avatarURL} />}
                  title={user.name}
                  subheader={"id: " + user.id}
                />
                <Divider />
                <CardContent>
                  <Typography component="p">
                    Answered questions: {Object.keys(user.answers).length}
                  </Typography>
                  <Typography component="p">
                    Created questions: {user.questions.length}
                  </Typography>
                  <Divider light className={classes.divider} />
                  <Typography variant="subtitle1">
                    <strong>Total Score: {this.getScoreFromUser(user)}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Leaderboard));
