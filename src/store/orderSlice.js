import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        items: action.payload,
        status: 'new',
        expanded: false,
      };
      state.orders.push(newOrder);
    },
    payOrder: (state, action) => {
      const order = state.orders.find((order) => order.id === action.payload.orderId);
      if (order) {
        order.status = 'paid';
      }
    },
    receiveOrder: (state, action) => {
      const order = state.orders.find((order) => order.id === action.payload.orderId);
      if (order) {
        order.status = 'delivered';
      }
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { createOrder, payOrder, receiveOrder, setOrders } = orderSlice.actions;

export default orderSlice.reducer;

export const selectNewOrdersCount = (state) => state.orders.orders.filter((order) => order.status === 'new').length;
