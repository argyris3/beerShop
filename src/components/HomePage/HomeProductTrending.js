import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductsAction } from '../../redux/slices/products/productSlices';
import baseURL from '../../utils/baseURL';
import { BiEuro } from 'react-icons/bi';
const HomeProductTrending = () => {
  //build up url
  let productUrl = `${baseURL}/products`;
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch]);
  //get data from store
  const {
    products: { products },
    error,
    loading,
  } = useSelector((state) => state?.products);
  console.log(products);
  const trendingProducts = products?.slice(0, 5);
  return (
    <>
      <section aria-labelledby="trending-heading">
        <div className="max-w-8xl py-24 px-0 sm:px-1 sm:py-32 lg:px-2 lg:pt-32">
          <div className="md:flex md:items-center md:justify-between">
            <h2 id="favorites-heading" className="text-2xl font-Cardo font-bold tracking-tight text-gray-900">
              Best Review Beers
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-0 gap-y-6 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 xl:grid xl:grid-cols-5">
            {trendingProducts?.map((product) => (
              <Link to={`/products/${product._id}`} key={product.id} className="group relative">
                <div className="h-72 w-full  overflow-hidden rounded-md  lg:h-62 xl:h-72">
                  <img
                    src={product.images[0]}
                    alt={product.images[0]}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="mt-4 font-Philosopher px-14 text-md text-gray-700">
                  <span className="absolute inset-0" />
                  {product.name}
                </h3>

                <p className="mt-1 flex items-center px-14 text-sm font-medium text-gray-900">
                  {product.price}.00 <BiEuro className="" />{' '}
                </p>

                <p className="mt-1 px-14 font-Cardo text-sm text-gray-500">
                  {product.description.substring(0, product.description.indexOf('.'))}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProductTrending;
