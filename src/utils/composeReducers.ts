export const composeReducers = (...reducers: any[]) => (state, action) => reducers.reduce((accState, reducer) => reducer(accState, action), state);
