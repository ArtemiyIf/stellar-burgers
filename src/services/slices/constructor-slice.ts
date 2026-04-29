import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: (TIngredient & { id: string })[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient & { id: string }>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i > 0)
        [state.ingredients[i], state.ingredients[i - 1]] = [
          state.ingredients[i - 1],
          state.ingredients[i]
        ];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i < state.ingredients.length - 1)
        [state.ingredients[i], state.ingredients[i + 1]] = [
          state.ingredients[i + 1],
          state.ingredients[i]
        ];
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
