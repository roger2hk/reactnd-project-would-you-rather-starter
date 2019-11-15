import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Card,
  CardHeader,
  CardActions,
  Paper,
  Tabs,
  Tab
} from "@material-ui/core";

import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    background: "#eeeeee",
    minHeight: "100vh",
    padding: theme.spacing(0, 0, 3, 0)
  },
  badge: {
    padding: theme.spacing(0, 2)
  },
  tabs: {
    background: "white"
  }
});

class Dashboard extends Component {
  state = {
    tabIndex: "unanswered"
  };

  handleChange = (event, value) => {
    event.preventDefault();
    this.setState({ tabIndex: value });
  };

  filterQuestionByTab = question => {
    let answeredIds = Object.keys(
      this.props.users[this.props.authedUser].answers
    );
    if (this.state.tabIndex === "answered") {
      return answeredIds.includes(question.id);
    } else {
      return !answeredIds.includes(question.id);
    }
  };

  sortQuestionByTimestamp = (q1, q2) => q2.timestamp - q1.timestamp;

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          <Tab
            label={
              <Badge
                className={classes.badge}
                color="primary"
                badgeContent={
                  Object.keys(this.props.questions).length -
                  Object.keys(this.props.users[this.props.authedUser].answers)
                    .length
                }
              >
                Unanswered
              </Badge>
            }
            value="unanswered"
          />
          <Tab
            label={
              <Badge
                className={classes.badge}
                color="primary"
                badgeContent={
                  Object.keys(this.props.users[this.props.authedUser].answers)
                    .length
                }
              >
                Answered
              </Badge>
            }
            value="answered"
          />
        </Tabs>

        {Object.values(this.props.questions)
          .filter(this.filterQuestionByTab)
          .sort(this.sortQuestionByTimestamp)
          .map(question => (
            <Box key={question.id} m={3}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={this.props.users[question.author].name}
                      src={this.props.users[question.author].avatarURL}
                    />
                  }
                  title={this.props.users[question.author].name + " asks"}
                  subheader={
                    "Would you rather " + question.optionOne.text + " or ..."
                  }
                />
                <CardActions>
                  <Button
                    size="small"
                    component={NavLink}
                    to={"/questions/" + question.id}
                  >
                    View Poll
                  </Button>
                </CardActions>
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

Dashboard.propTypes = {
  authedUser: PropTypes.string,
  users: PropTypes.object,
  questions: PropTypes.object
};

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
