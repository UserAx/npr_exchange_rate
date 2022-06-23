import { StateI } from "../app/App";
import { DispatchTypes } from "../actions/ActionTypes";
import { Dispatch, useCallback, useMemo, useReducer, useRef } from "react";

export type ThunkAction<DispatchTypes> = (dispatch: Dispatch<DispatchTypes>) => DispatchTypes;
export type AsyncDispatch<DispatchTypes> = Dispatch<DispatchTypes | ThunkAction<DispatchTypes>>;

export function useCustomReducer(
    reducer: (state: StateI, action: DispatchTypes) => StateI, 
    defaultState: StateI, enableLogging: boolean
    ) {
    const [state, dispatch] = useReducer(reducer, defaultState);
    
    //A ref to save static value
    //Our state will be default when this initalize
    const preState = useRef({actions: <any[]> [], actionType: '', state});

    //Log our dispatched in dev mode, using enableLogging
    // We will export this dispatch if enableLogging is true
    const dispatchWithLogging  = useCallback((action: any ) => {

        //if our action is a function just return it with dispatchWithLogging
        //Since our action is a function: () => async (dispatch: Dispa....) => void
        if(typeof action === "function") return action(dispatchWithLogging);

        //Get our type. See if action is an object or just plain string
        const actionType = typeof action === "object" ? action.type : action;

        //Save our actions in our ref
        //We will use this for logging
        preState.current.actions.push({actionType, action});
        
        //Then we can dispatch the action
        return dispatch(action);
    }, []);

    //If logging is true, return our above dispatchWithLogging else the usual one.
    const customDispatch = enableLogging ? dispatchWithLogging : dispatch;

    //Remember our value and only log if state or enableLogging changes
    //When the value of our state change, we will console.log the values
    useMemo(function logState() {
        //Don't log if enableLogging is off or nothing in our current object.
        if(!enableLogging || !(Object.keys(preState.current).length === 0) ) return;

        //Currently, state in our preState is previousState object.
        //Only below we will replace it with the updated state.
        for(var i=0; i<preState.current.actions.length; i++){
            const {action, actionType, state: previousState} = preState.current.actions[i];
    
            //Log all of the values inside our static ref.
            console.groupCollapsed(`${actionType}`);
            console.log("%c Previous State", "color: red;", previousState);
            console.log("%c Previous State", "color: blue;", action);
            console.log("%c Current State", "color: green;", state);
            console.groupEnd();

            //Resetting our actions array
            preState.current.actions = [];

        }
    }, [state, enableLogging]);

    //Save our changes to our ref
    //After logging the changes with useMemo above
    //We will re-update our new state in our preState ref
    preState.current = {...preState.current, state};

    //Finally return our state and dispatch
    return [state, customDispatch];

}