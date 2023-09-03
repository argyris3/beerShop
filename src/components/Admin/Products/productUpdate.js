import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useParams } from 'react-router-dom';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import SuccessMsg from '../../SuccessMsg/SuccessMsg';
import {
  createProductAction,
  fetchProductAction,
  updateProductAction,
} from '../../../redux/slices/products/productSlices';
import { fetchedCategoriesAction } from '../../../redux/slices/categories/categoriesSlice';
import { fetchedTypesAction } from '../../../redux/slices/categories/TypeSlice';

//animated components for react-select
const animatedComponents = makeAnimated();

export default function ProductUpdate() {
  //
  const dispatch = useDispatch();
  //get id
  const { id } = useParams();
  //fetch single product
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [id, dispatch]);

  //categories
  useEffect(() => {
    dispatch(fetchedCategoriesAction());
  }, [dispatch]);

  //select data from store
  const { categories } = useSelector((state) => state?.categories?.categories);
  //types
  useEffect(() => {
    dispatch(fetchedTypesAction());
  }, [dispatch]);
  //select data from store
  const {
    types: { types },
  } = useSelector((state) => state?.types);

  //get product from store
  const {
    product: { product },
    isUpdated,
    loading,
    error,
  } = useSelector((state) => state?.products);

  //---form data---
  const [formData, setFormData] = useState({
    name: product?.name,
    description: product?.description,
    category: '',

    type: '',

    price: product?.price,
    totalQty: product?.totalQty,
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //dispatch
    dispatch(
      updateProductAction({
        ...formData,
        id,
      })
    );
    //reset form data
    setFormData({
      name: '',
      description: '',
      category: '',
      type: '',
      colors: '',
      images: '',
      price: '',
      totalQty: '',
    });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Product Updated Successfully" />}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Update Product</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">Manage Products</p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData?.name}
                    onChange={handleOnChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Select category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Category --</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Type --</option>
                  {types?.map((type) => (
                    <option key={type?._id} value={type?.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* upload images */}

              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Quantity</label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Add Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    className="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Update Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
