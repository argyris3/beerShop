import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import ManageCoupons from './components/Admin/Coupons/ManageCoupons';
import AddCoupon from './components/Admin/Coupons/AddCoupon';
import Login from './components/Users/Forms/Login';
import AddProduct from './components/Admin/Products/AddProduct';
import RegisterForm from './components/Users/Forms/RegisterForm';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import BrandsList from './components/Admin/Categories/BrandsList.js';
import OrderHistory from './components/Admin/Orders/ManageOrders';
import OrderPayment from './components/Users/Products/OrderPayment';
import ManageCategories from './components/Admin/Categories/ManageCategories';
import UpdateProduct from './components/Admin/Products/UpdateProduct';
import ManageStocks from './components/Admin/Products/ManageStocks';
import CategoryToAdd from './components/Admin/Categories/CategoryToAdd.js';
import AddCategory from './components/Admin/Categories/AddCategory.js';
import AddBrand from './components/Admin/Categories/AddBrand.js';
import ThanksForOrdering from './components/Users/Products/ThanksForOrdering';
import AllCategories from './components/HomePage/AllCategories';
import UpdateCoupon from './components/Admin/Coupons/UpdateCoupon';
import Product from './components/Users/Products/Product.js';
import ShoppingCart from './components/Users/Products/ShoppingCart';
import ProductsFilters from './components/Users/Products/ProductsFilters';
import CustomerProfile from './components/Users/Profile/CustomerProfile';
import AddReview from './components/Users/Reviews/AddReview';
import ProductUpdate from './components/Admin/Products/productUpdate.js';
import UpdateCategory from './components/Admin/Categories/UpdateCategory';
import AuthRoute from './components/AuthRoute/AuthRoute';
import OrdersList from './components/Admin/Orders/OdersList';
import ManageOrders from './components/Admin/Orders/ManageOrders';
import Customers from './components/Admin/Orders/Customers';
import UpdateOrders from './components/Admin/Orders/UpdateOrders.js';
import AdminRoutes from './components/AuthRoute/AdminRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from './redux/slices/users/usersSlice.js';

const App = () => {
  //dispatch
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserProfileAction());
  // }, [dispatch]);
  // const { userAuth } = useSelector((state) => state?.users);
  // const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true : false;
  return (
    <BrowserRouter>
      {/* hide navbar if admin */}
      {<Navbar />}

      <Routes>
        {/* nested route */}
        <Route path="admin" element={<AdminDashboard />}>
          {/* products */}
          <Route
            path=""
            element={
              <AdminRoutes>
                <OrdersList />
              </AdminRoutes>
            }
          />
          <Route
            path="add-product"
            element={
              <AdminRoutes>
                <AddProduct />
              </AdminRoutes>
            }
          />
          <Route
            path="manage-products"
            element={
              <AdminRoutes>
                <ManageStocks />
              </AdminRoutes>
            }
          />
          <Route
            path="products/edit/:id"
            element={
              <AdminRoutes>
                <ProductUpdate />
              </AdminRoutes>
            }
          />
          {/* coupons */}
          <Route
            path="add-coupon"
            element={
              <AdminRoutes>
                <AddCoupon />
              </AdminRoutes>
            }
          />
          <Route path="manage-coupon" element={<ManageCoupons />} />
          <Route
            path="manage-coupon/edit/:code"
            element={
              <AdminRoutes>
                <ManageCoupons />
              </AdminRoutes>
            }
          />
          {/* Category */}
          {
            <Route
              path="category-to-add"
              element={
                <AdminRoutes>
                  <CategoryToAdd />
                </AdminRoutes>
              }
            />
          }
          <Route path="add-category" element={<AddCategory />} />
          <Route
            path="manage-category"
            element={
              <AdminRoutes>
                <ManageCategories />
              </AdminRoutes>
            }
          />
          <Route
            path="edit-category/:id"
            element={
              <AdminRoutes>
                <UpdateCategory />
              </AdminRoutes>
            }
          />
          {/* brand category */}
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="all-types" element={<BrandsList />} />
          {/* Orders */}
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route
            path="orders/:id"
            element={
              <AdminRoutes>
                <UpdateOrders />
              </AdminRoutes>
            }
          />

          <Route
            path="customers"
            element={
              <AdminRoutes>
                <Customers />
              </AdminRoutes>
            }
          />
        </Route>
        {/* public links */}
        {/* Products */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products-filters" element={<ProductsFilters />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/all-categories" element={<AllCategories />} />
        <Route path="/success" element={<ThanksForOrdering />} />
        {/* {/* review } */}
        <Route
          path="/add-review/:id"
          element={
            <AuthRoute>
              <AddReview />
            </AuthRoute>
          }
        />

        {/* shopping cart */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/order-payment"
          element={
            <AuthRoute>
              <OrderPayment />
            </AuthRoute>
          }
        />
        {/* users */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/customer-profile"
          element={
            <AuthRoute>
              <CustomerProfile />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
