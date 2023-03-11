import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { deviceAPI } from "../services/DeviceService";
import { typeAPI } from "../services/TypeService";
import { brandAPI } from "../services/BrandService";
import authReducer from './reducers/auth/AuthSlice'
// import { listenerMiddleware } from './middleware/loginMiddleware'

const rootReducer = combineReducers({
  authReducer,
  [deviceAPI.reducerPath]: deviceAPI.reducer,
  [typeAPI.reducerPath]: typeAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false})
      // .prepend(listenerMiddleware.middleware)
      .concat(deviceAPI.middleware)
      .concat(typeAPI.middleware)
      .concat(brandAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']