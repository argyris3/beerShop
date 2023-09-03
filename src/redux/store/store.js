import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categories/categoriesSlice';
import typeReducer from '../slices/categories/TypeSlice';
import cartReducer from '../slices/cart/cartSlices';
import couponsReducer from '../slices/coupons/couponsSlics';

import reviewsReducer from '../slices/reviews/reviewsSlice';
import ordersReducer from '../slices/orders/ordersSlices';


//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    types: typeReducer,
    cart: cartReducer,
    coupons: couponsReducer,
   orders:ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
