import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { handleSaveQuestion } from "../actions/shared";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: 20,
    textAlign: "center"
  },
  textField: {
    margin: theme.spacing(2),
    width: 200
  }
});

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };

  handleOptionOneUpdate = event => {
    event.preventDefault();
    this.setState({
      optionOneText: event.target.value
    });
  };

  handleOptionTwoUpdate = event => {
    event.preventDefault();
    this.setState({
      optionTwoText: event.target.value
    });
  };

  isSubmitButtonDisabled = () => {
    return !this.state.optionOneText || !this.state.optionTwoText;
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(
      handleSaveQuestion({
        author: this.props.authedUser,
        optionOneText: this.state.optionOneText,
        optionTwoText: this.state.optionTwoText
      })
    );

    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Create New Question
        </Typography>

        <Box my={2}>
          <Divider />
        </Box>

        <Typography component="p">WOULD YOU RATHER</Typography>

        <TextField
          id="option-one-input"
          className={classes.textField}
          label="Option One"
          margin="normal"
          variant="outlined"
          onChange={this.handleOptionOneUpdate}
        />
        <Typography component="p">OR</Typography>
        <TextField
          id="option-two-input"
          className={classes.textField}
          label="Option Two"
          margin="normal"
          variant="outlined"
          onChange={this.handleOptionTwoUpdate}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={this.isSubmitButtonDisabled()}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withStyles(styles)(connect(mapStateToProps)(NewQuestion));
