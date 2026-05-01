import { rootReducer } from '../root-reducer';

describe('rootReducer', () => {
  test('возвращает начальное состояние при UNKNOWN_ACTION', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что состояние не изменилось при неизвестном экшене
    expect(state).toEqual(initialState);
    
    // Проверяем структуру начального состояния
    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null
    });
    
    expect(state.constructorBurger).toEqual({
      bun: null,
      ingredients: []
    });
    
    expect(state.order).toHaveProperty('newOrderData');
    expect(state.order).toHaveProperty('viewedOrderData');
    expect(state.order).toHaveProperty('orderRequest');
    
    expect(state.feed).toHaveProperty('orders');
    expect(state.feed).toHaveProperty('total');
    expect(state.feed).toHaveProperty('totalToday');
    
    expect(state.user).toHaveProperty('user');
    expect(state.user).toHaveProperty('isAuthChecked');
    expect(state.user).toHaveProperty('isLoading');
    expect(state.user).toHaveProperty('error');
  });
});
