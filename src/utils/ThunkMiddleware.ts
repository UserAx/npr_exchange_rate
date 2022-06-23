import {Dispatch} from 'react';
import {DispatchTypes} from '../actions/ActionTypes';

//Our Async Dispatch Type
export type ThunkAction<DispatchTypes> = (dispatch: Dispatch<DispatchTypes>) => Promise<void>;
//Async or just normal disptach Type
export type AsyncDispatch<DispatchTypes> = Dispatch<DispatchTypes | ThunkAction<DispatchTypes>>

//Takes dispatch function and returns our Async Dispatch function
export function asyncDispatch<DispatchTypes>(dispatch: Dispatch<DispatchTypes>): AsyncDispatch<DispatchTypes> {
  return function(action: DispatchTypes | ThunkAction<DispatchTypes>) {
      //If our action is a async function
      //return it with dispatch as input
    if (action instanceof Function) {
      return action(dispatch)
    }
    //else just dispatch the normal action
    return dispatch(action)
  }
}
