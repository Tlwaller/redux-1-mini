import { createStore } from "redux";

const initialState = {
  currentValue: 0,
  futureValues: [],
  pastValues: []
};

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const UNDO = "UNDO";
export const REDO = "REDO";

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        futureValues: [],
        pastValues: [state.currentValue, ...state.pastValues],
        currentValue: state.currentValue + action.amount
      };
    case DECREMENT:
      return {
        futureValues: [],
        pastValues: [state.currentValue, ...state.pastValues],
        currentValue: state.currentValue - action.amount
      };
    case UNDO:
      return {
        futureValues: [state.currentValue, ...state.futureValues],
        currentValue: state.pastValues[0],
        pastValues: state.pastValues.slice(1)
      };
    case REDO:
      return {
        currentValue: state.futureValues[0],
        futureValues: state.futureValues.slice(1),
        pastValues: [state.currentValue, ...state.pastValues]
      };
    default:
      return state;
  }
};

export default createStore(counter);
