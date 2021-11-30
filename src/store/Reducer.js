import ReducerActions from "./ReducerActions";

const Reducer = (state, action) => {
  switch (action.type) {
    case ReducerActions.setSelectedItem: {
      return { ...state, selectedItem: action.payload };
    }
    case ReducerActions.clearSelectedItem: {
      return { ...state, selectedItem: {} };
    }
    default:
      return state;
  }
};

export default Reducer;
