
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../constructor-slice';

const bun = {
  _id: '1',
  name: 'Булка',
  type: 'bun' as const,
  price: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main1 = {
  _id: '2',
  name: 'Начинка 1',
  type: 'main' as const,
  price: 50,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 50,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main2 = {
  _id: '3',
  name: 'Начинка 2',
  type: 'main' as const,
  price: 60,
  proteins: 12,
  fat: 12,
  carbohydrates: 12,
  calories: 60,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice', () => {
  test('добавление булки', () => {
    const state = constructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual({ ...bun, id: expect.any(String) });
  });

  test('добавление начинки', () => {
    const state = constructorReducer(undefined, addIngredient(main1));
    expect(state.ingredients).toHaveLength(1);
  });

  test('удаление ингредиента', () => {
    let state = constructorReducer(undefined, addIngredient(main1));
    state = constructorReducer(state, removeIngredient(0));
    expect(state.ingredients).toHaveLength(0);
  });

  test('перемещение вверх', () => {
    let state = constructorReducer(undefined, addIngredient(main1));
    state = constructorReducer(state, addIngredient(main2));
    state = constructorReducer(state, moveIngredientUp(1));
    expect(state.ingredients[0].name).toBe('Начинка 2');
  });

  test('перемещение вниз', () => {
    let state = constructorReducer(undefined, addIngredient(main1));
    state = constructorReducer(state, addIngredient(main2));
    state = constructorReducer(state, moveIngredientDown(0));
    expect(state.ingredients[0].name).toBe('Начинка 2');
  });
});
