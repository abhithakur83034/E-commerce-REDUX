const initialState = {
  data: [],
};

const itemReducer = (state = initialState, action) => {
  // console.log("reducer1", action);
  switch (action.type) {
    case "ITEM":
      return {
        ...state,
        data: action.payload,
      };

    

    default:
      return state;
  }
};




// export default itemReducer ;
export  default itemReducer

