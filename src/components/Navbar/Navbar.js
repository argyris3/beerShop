import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import logo from './logo3.png';
import baseURL from '../../utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedCategoriesAction } from '../../redux/slices/categories/categoriesSlice';
import { getCartItemsFromLocalStorageAction } from '../../redux/slices/cart/cartSlices';
import { logoutAction } from '../../redux/slices/users/usersSlice';
import { fetchedCouponsAction } from '../../redux/slices/coupons/couponsSlics';

export default function Navbar() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchedCategoriesAction());
  }, [dispatch]);

  //get data form the store
  const { categories } = useSelector((state) => state?.categories);
  console.log(categories);
  const categoriesToDisplay = categories?.categories?.slice(0, 7);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  //get cart items from local storage
  const { cartItems } = useSelector((state) => state?.cart);
  //get login user from local storage
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const isLoggedIn = user?.token ? true : false;
  //logout
  const logoutHandler = () => {
    dispatch(logoutAction());
    window.location.href = '/';
  };
  //coupons

  useEffect(() => {
    dispatch(fetchedCouponsAction());
  }, [dispatch]);
  //get coupons
  const { coupons, loading, error } = useSelector((state) => state?.coupons);
  //get cyrrent coupon
  const currentCoupon = coupons ? coupons?.coupons?.[coupons?.coupons?.length - 1] : console.log(currentCoupon);

  return (
    <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {/* mobile category menu links */}
                <div className="space-y-6 border-t border-gray-200 py-6 px-4 font-Cardo">
                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                  {categoriesToDisplay?.length <= 0 ? (
                    <>
                      <a
                        href={`${baseURL}/products?category=lagers`}
                        className="flex items-center text-sm  font-Cardo text-gray-700 hover:text-gray-800"
                      >
                        Lagers
                      </a>

                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Anglo-American Ales
                      </a>

                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Belgian-Style Ales
                      </a>
                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Stout and Porter
                      </a>
                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Sour Beer
                      </a>
                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Wheat Beer
                      </a>
                      <a href="/" className="flex items-center text-sm font-Cardo text-gray-700 hover:text-gray-800">
                        Other Styles
                      </a>
                    </>
                  ) : (
                    categoriesToDisplay?.map((category) => {
                      return (
                        <>
                          <Link
                            key={category?._id}
                            to={`/products-filters?category=${category?.name}`}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {category?.name}
                          </Link>
                        </>
                      );
                    })
                  )}
                </div>

                {/* mobile links register/login */}
                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {!isLoggedIn && (
                    <>
                      {' '}
                      <div className="flow-root">
                        <Link to="/register" className="-m-2 block p-2 font-Cardo text-gray-900">
                          Create an account
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link to="/login" className="-m-2 block p-2 font-Cardo text-gray-900">
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* coupon navbar */}
          {!currentCoupon?.isExpired && (
            <div className="bg-gray-900 font-Philosopher">
              <div className=" h-18 max-w-full py-4  px-4 sm:px-6 lg:px-8">
                <p className="text-center md:text-2xl  lg:text-4xl font-semibold text-white lg:flex-none tracking-wider">
                  {currentCoupon
                    ? `${currentCoupon?.code}-${currentCoupon?.discount}%, ${currentCoupon?.daysLeft}`
                    : 'Bacillus Doderlein Microbrewery'}
                </p>

                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end lg:space-x-6"></div>
              </div>
            </div>
          )}
          {/* Top navigation  desktop*/}
          {!isLoggedIn && (
            <div className="bg-gray-900">
              <div className=" h-18 max-w-full py-4  px-4 sm:px-6 lg:px-8">
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end lg:space-x-6">
                  {!isLoggedIn && (
                    <>
                      <Link to="/register" className="text-md font-Cardo text-white hover:text-gray-100">
                        Create an account
                      </Link>
                      <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                      <Link to="/login" className="text-md font-Cardo text-white hover:text-gray-100">
                        Sign in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Deskto Navigation */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500  ">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-full px-2 py-1 sm:px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden md:flex md:items-center">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img className="h-14 pt-2 w-auto" src={logo} alt="logo" />
                    </Link>
                  </div>

                  <div className="hidden h-full md:flex">
                    {/*  menus links*/}
                    <Popover.Group className="ml-6">
                      <div className="flex h-full font-Cardo   justify-center space-x-8">
                        {categoriesToDisplay?.length <= 0 ? (
                          <>
                            <Link
                              to={`${baseURL}/products?category=lagers`}
                              className="flex items-center md:text-sm text-gray-700 hover:text-gray-800"
                            >
                              Lagers
                            </Link>

                            <Link
                              to="/"
                              className="flex items-center md:text-sm lg:text-lg  text-gray-700 hover:text-gray-800"
                            >
                              Anglo-American Ales
                            </Link>

                            <Link
                              to="/"
                              className="flex items-center md:text-sm lg:text-lg text-gray-700 hover:text-gray-800"
                            >
                              Belgian-Style Ales
                            </Link>
                            <Link
                              to="/"
                              className="flex items-center md:text-sm lg:text-lg text-gray-700 hover:text-gray-800 "
                            >
                              Stout and Porter
                            </Link>
                            <Link
                              to="/"
                              className="flex items-center  md:text-sm lg:text-lg text-gray-700 hover:text-gray-800"
                            >
                              Sour Beer
                            </Link>
                            <Link
                              to="/"
                              className="flex items-center  md:text-sm lg:text-lg text-gray-700 hover:text-gray-800"
                            >
                              Wheat Beer
                            </Link>
                            <Link
                              to="/"
                              className="flex items-center md:text-sm lg:text-lg text-gray-700 hover:text-gray-800"
                            >
                              Other Styles
                            </Link>
                          </>
                        ) : (
                          categoriesToDisplay?.map((category) => {
                            return (
                              <>
                                <Link
                                  key={category?._id}
                                  to={`/products-filters?category=${category?.name}`}
                                  className="flex items-center text-sm lg:text-lg  font-medium capitalize text-gray-700 hover:text-gray-800"
                                >
                                  {category?.name}
                                </Link>
                              </>
                            );
                          })
                        )}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile Naviagtion */}
                  <div className="flex flex-1 items-center md:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* logo */}
                  <Link to="/" className="md:hidden">
                    <img className="h-12 mt-2 w-auto" src={logo} alt="logo" />
                  </Link>

                  {/* login profile icon mobile */}
                  <div className="flex flex-1 items-center justify-end">
                    {user?.userFound?.isAdmin && (
                      <Link
                        to="/admin"
                        className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-2 py-1 text-md font-Cardo text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    
                    "
                      >
                        Admin
                      </Link>
                    )}
                    <div className="flex items-center md:ml-8">
                      <div className="flex space-x-8">
                        {isLoggedIn && (
                          <div className="flex">
                            <Link to="/customer-profile" className="-m-2 mr-2  p-2 text-gray-400 hover:text-gray-500">
                              <UserIcon className="h-6 w-6" aria-hidden="true" />
                            </Link>
                            {/* logout */}
                            <button onClick={logoutHandler}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <span className="mx-4 h-6 w-px bg-gray-200 md:mx-6" aria-hidden="true" />
                      {/* login shopping cart mobile */}
                      <div className="flow-root">
                        <Link to="/shopping-cart" className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cartItems?.length > 0 ? cartItems.length : 0}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
