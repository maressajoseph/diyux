let reducersObject = {}
let state = {}
let afterDispatch = []

const dispatchFn = (actionType) => {
  state = Object.keys(reducersObject).reduce((acc, key) => ({ ...acc, [key]: reducersObject[key](state[key], actionType) }), {})
  afterDispatch.forEach((fn) => fn())
}

const subscribeFn = (func) => {
  afterDispatch.push(func)
}

const getStateFn = () => {
  return state
}

export const createStore = () => {
  return {
    dispatch: dispatchFn,
    subscribe: subscribeFn,
    getState: getStateFn
  }
}

export const combineReducers = (reducers) => {
  reducersObject = reducers
}