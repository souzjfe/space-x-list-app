import { combineReducers, configureStore } from '@reduxjs/toolkit'
import launchesReducer from './launchesSlice';

const rootReducer = combineReducers({
  launchesReducer,
})
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;