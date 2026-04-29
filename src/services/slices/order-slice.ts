import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  newOrderData: TOrder | null;
  viewedOrderData: TOrder | null;
  orderRequest: boolean;
}

const initialState: OrderState = {
  newOrderData: null,
  viewedOrderData: null,
  orderRequest: false
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.newOrderData = action.payload as any;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.viewedOrderData = action.payload;
      });
  }
});

export const { clearNewOrder } = orderSlice.actions;
export default orderSlice.reducer;
