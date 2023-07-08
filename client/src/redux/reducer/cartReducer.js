const itemCart = (state = [], action) => {
  console.log("reducer2", action.type);
  console.log("reducer2.............", action.payload);
  switch (action.type) {


    case "ADD_TO_CART": {
      let itemInState = state.find((item) => item._id === action.payload._id);

      if (itemInState) return state;

      return [...state, action.payload];
    }



    case "INCREMENT": {
      let updatedState = [...state];
      state.forEach((item, index) => {
        if (item._id === action.payload._id) updatedState[index].quantity += 1;
      });
      return [...updatedState];
    }



    case "DECREMENT": {
      let updatedState = [...state];
      state.forEach((item, index) => {
        if (item._id === action.payload._id && updatedState[index].quantity > 1)
          updatedState[index].quantity -= 1;
      });
      return [...updatedState];
    }




    case "REMOVE_TO_CART": {
      let updatedState = state.filter(
        (item) => item._id !== action.payload._id
      );
      console.log("gdgfsjufhdfdsffggg", updatedState);
      return [...updatedState];
    }


    
    default:
      return state;
  }
};

export default itemCart;
