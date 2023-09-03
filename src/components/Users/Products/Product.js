import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import Swal from 'sweetalert2';

import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductAction } from '../../../redux/slices/products/productSlices';
import { addToCartAction, getCartItemsFromLocalStorageAction } from '../../../redux/slices/cart/cartSlices';
import { BiEuro } from 'react-icons/bi';

// import {
//   addOrderToCartaction,
//   getCartItemsFromLocalStorageAction,
// } from "../../../redux/slices/cart/cartSlices";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Product() {
  //dispatch
  const dispatch = useDispatch();

  let productDetails = {};

  //get id from params
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [id]);
  //get data from store
  const {
    loading,
    error,
    product: { product },
  } = useSelector((state) => state?.products);

  //Get cart items
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, []);
  //get data from store
  const { cartItems } = useSelector((state) => state?.cart);
  const productExists = cartItems?.find((item) => item?._id?.toString() === product?._id.toString());

  //Add to cart handler
  const addToCartHandler = () => {
    //check if product is in cart
    if (productExists) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This product is already in cart',
      });
    }
    dispatch(
      addToCartAction({
        _id: product?._id,
        name: product?.name,
        qty: 1,
        price: product?.price,
        description: product?.description,
        image: product?.images[0],
        totalPrice: product?.price,
        qtyLeft: product?.qtyLeft,
      })
    );

    //}
    //   // dispatch(
    //   //   addOrderToCartaction({
    //   //     _id: product?._id,
    //   //     name: product?.name,
    //   //     qty: 1,
    //   //     price: product?.price,
    //   //     description: product?.description,
    //   //     color: selectedColor,
    //   //     size: selectedSize,
    //   //     image: product?.images[0],
    //   //     totalPrice: product?.price,
    //   //     qtyLeft: product?.qtyLeft,
    //   //   })
    //   // );
    Swal.fire({
      icon: 'success',
      title: 'Good Job',
      text: 'Product added to cart successfully',
    });

    return dispatch(getCartItemsFromLocalStorageAction());
  };

  return (
    <div className="bg-gradient-to-l from-[#3b7eaa] to-[#ffe47a] ">
      <main className="mx-auto pt-6  max-w-2xl px-4 pb-16 sm:px-6 xl:h-full sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-3xl  font-Philosopher text-gray-900">{product?.name}</h1>
              <p className="text-2xl font-Philosopher flex items-center text-gray-900">
                {' '}
                {product?.price}.00 <BiEuro />
              </p>
            </div>
            {/* Reviews */}
            <div className="mt-4">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  {product?.reviews?.length > 0 ? product?.averageRating : 0}
                  {/* <span className="sr-only"> out of 5 stars</span> */}
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        +product?.averageRating > rating ? 'text-yellow-400' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="ml-4 text-sm text-gray-300"></div>
                <div className="ml-4 flex">
                  <a href="#" className="text-sm font-Philosopher text-indigo-600 hover:text-indigo-500">
                    {productDetails?.product?.totalReviews} total reviews
                  </a>
                </div>
              </div>
              {/* leave a review */}

              <div className="mt-4">
                <Link to={`/add-review/${product?._id}`}>
                  <h3 className="text-sm font-Philosopher text-blue-600">Leave a review</h3>
                </Link>
              </div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Images</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8">
              {product?.images?.map((image) => (
                <img
                  key={image.id}
                  src={image}
                  alt={image.imageAlt}
                  className={classNames(
                    image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                    'rounded-lg'
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 lg:col-span-5">
            <>
              {/* add to cart */}
              {product?.qtyLeft <= 0 ? (
                <button
                  style={{ cursor: 'not-allowed' }}
                  disabled
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 py-3 px-8 text-base font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() => addToCartHandler()}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 font-Philosopher px-8 text-xl font-medium text-gray-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              )}
              {/* proceed to check */}

              {cartItems.length > 0 && (
                <Link
                  to="/shopping-cart"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-green-800 py-3 px-8 text-xl font-Philosopher text-gray-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Proceed to checkout
                </Link>
              )}
            </>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-md font-Philosopher text-gray-900">Description</h2>
              <div className="prose prose-sm mt-4 font-Philosopher text-gray-500">{product?.description}</div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24 lg:mt-2">
          <h2 id="reviews-heading" className="text-lg font-Philosopher text-gray-900">
            Recent reviews
          </h2>

          <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
            {product?.reviews.map((review) => (
              <div key={review._id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <h3 className="text-sm font-Philosopher text-gray-900">{review?.message}</h3>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-Philosopher text-gray-900">{review.user?.fullname}</p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
