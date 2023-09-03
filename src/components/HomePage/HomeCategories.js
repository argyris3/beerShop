import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchedCategoriesAction } from '../../redux/slices/categories/categoriesSlice';

const HomeCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchedCategoriesAction());
  }, [dispatch]);
  //get data form the store
  const { categories } = useSelector((state) => state?.categories);
  console.log(categories);
  const categoriesToShow = categories?.categories?.slice(0, 5);

  return (
    <>
      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative h-80 overflow-x-auto py-2 xl:overflow-hidden">
            <div className="min-w-screen-xl absolute font-Cardo flex space-x-8 px-4 sm:px-6 lg:px-4 xl:relative xl:grid lg:grid lg:grid-cols-4 lg:gap-y-4 xl:grid-cols-4 md:grid md:grid-cols-3 xl:gap-x-8 xl:space-x-0 xl:px-0 sm:grid sm:grid-cols-3">
              {categoriesToShow?.map((category) => (
                <Link
                  key={category.name}
                  to={`/products-filters?category=${category.name}`}
                  className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                >
                  <span aria-hidden="true" className="absolute inset-0">
                    <img src={category.image} alt="" className="h-full w-full object-cover object-center" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                  />
                  <span className="relative mt-auto text-center text-2xl font-normal text-gray-200">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCategories;
