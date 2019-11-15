import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
  Paper
} from "@material-ui/core";
import { handleSaveQuestionAnswer } from "../actions/shared";

const styles = theme => ({
  root: {
    background: "#eeeeee",
    minHeight: "100vh",
    padding: theme.spacing(3, 0, 3, 0),
    textAlign: "center"
  },
  card: {
    display: "inline-block"
  },
  cardActions: {
    justifyContent: "center"
  },
  orText: {
    padding: theme.spacing(1, 0, 1, 0)
  }
});

class Question extends Component {
  componentDidMount = () => {
    if (this.props.question) {
      let answer = this.props.users[this.props.authedUser].answers[
        this.props.question.id
      ];
      !!answer && this.setState({ answer: answer, isAnswered: true });
    }
  };

  state = {
    answer: "",
    isAnswered: false
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ answer: event.target.value });
  };

  isQuestionAnswered = () => {
    const { authedUser, users, question } = this.props;
    return (
      Object.keys(users[authedUser].answers).includes(question.id) || this.state.isAnswered
    );
  };

  isSubmitButtonDisabled = () => {
    return !this.state.answer || this.isQuestionAnswered();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isAnswered: true });
    this.props.dispatch(
      handleSaveQuestionAnswer({
        authedUser: this.props.authedUser,
        qid: this.props.question.id,
        answer: this.state.answer
      })
    );
  };

  render() {
    const { classes, users, question } = this.props;

    if (question === null) {
      return (
        <Typography component="p">
          The question you're looking for does not exist. Sorry.
        </Typography>
      );
    }

    const { author, optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <Paper className={classes.root}>
        <Box m={3}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt={users[author].name}
                  src={users[author].avatarURL}
                />
              }
              title={users[author].name + " asks"}
            />
            <CardContent>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Would You Rather</FormLabel>
                <RadioGroup
                  aria-label="option"
                  name="option"
                  value={this.state.answer}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="optionOne"
                    control={<Radio />}
                    label={optionOne.text}
                    disabled={this.isQuestionAnswered()}
                  />
                  {this.isQuestionAnswered() && (
                    <FormHelperText>
                      {optionOne.votes.length +
                        " out of " +
                        totalVotes +
                        " votes"}
                    </FormHelperText>
                  )}
                  <Typography component="p" className={classes.orText}>
                    OR
                  </Typography>
                  <FormControlLabel
                    value="optionTwo"
                    control={<Radio />}
                    label={optionTwo.text}
                    disabled={this.isQuestionAnswered()}
                  />
                  {this.isQuestionAnswered() && (
                    <FormHelperText>
                      {optionTwo.votes.length +
                        " out of " +
                        totalVotes +
                        " votes"}
                    </FormHelperText>
                  )}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.isSubmitButtonDisabled()}
                onClick={this.handleSubmit}
              >
                Vote
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { match }) {
  const question = questions[match.params.id] || null;

  return {
    authedUser,
    users,
    question: question
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Question));
