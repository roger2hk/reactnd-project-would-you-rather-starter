import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, saveUserQuestion } from "../actions/users";
import { receiveQuestions, addQuestion } from "../actions/questions";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleSaveQuestion(question) {
  return dispatch => {
    return saveQuestion(question).then(question => {
      dispatch(addQuestion(question));
      dispatch(saveUserQuestion(question));
    });
  };
}

export function handleSaveQuestionAnswer({ authedUser, qid, answer }) {
  return dispatch => {
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(handleInitialData());
    });
  };
}
