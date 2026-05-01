import ingredientsReducer, { fetchIngredients } from '../ingredients-slice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('pending — isLoading = true', () => {
    const state = ingredientsReducer(initialState, { type: fetchIngredients.pending.type });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled — данные записываются, isLoading = false', () => {
    const ingredients = [{ _id: '1', name: 'Test', type: 'bun', price: 100 }];
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients as any
    });
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  test('rejected — ошибка записывается, isLoading = false', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
