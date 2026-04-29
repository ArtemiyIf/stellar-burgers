import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import constructorReducer from './slices/constructor-slice';
import orderReducer from './slices/order-slice';
import feedReducer from './slices/feed-slice';
import userReducer from './slices/user-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer
});
