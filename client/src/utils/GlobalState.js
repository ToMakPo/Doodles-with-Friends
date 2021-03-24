import React, { createContext, useReducer, useContext } from "react";

const wordBankContext = createContext();
const { Provider } = wordBankContext; //deconstructed provider method

const reducer = (state, action) => { //this is our reducer method
    switch(action.type){
        case "newWord":
            // console.log(state)
            return([...state,{
                name: action.name,
                id:Date.now()
            }])
        case "deleteWord":
            return(state.filter(word => {
                return word.id !== action.id
            }))
        default:
            return state
    }
}; //where does the initial state go here? is it in the line belwo?

const WordBankProvider = ({ value = [], ...props }) => {

  const [state, dispatch] = useReducer(reducer, []); //reducer method defined above

  return <Provider value={[state, dispatch]} {...props} />; //pass into our provider what the reducer passes back so any child component has access to the state and the provider method to modify that state
};

const useWordBankContext = () => { //create a custom hook
  return useContext(wordBankContext); //consume the specific context we want to make it easier to pass to our child components. 
};

export { WordBankProvider, useWordBankContext };
