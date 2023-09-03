import React from 'react';
import { Link } from 'react-router-dom';
import { BiEuro } from 'react-icons/bi';
const Products = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
        {products?.map((product) => (
          <>
            {/* new */}

            <div className="relative   ">
              <Link
                className="block"
                to={{
                  pathname: `/products/${product?.id}`,
                  // state: {
                  //   product: product,
                  // },
                }}
              >
                <img className="w-56 h-auto object-cover" src={product?.images[0]} alt />
              </Link>
              <div className="px-6 pb-6 mt-8">
                <a className="block px-6 mb-2" href="#">
                  <h3 className="mb-2 text-xl font-Cardo font-heading">{product?.name}</h3>
                  <p className="text-lg font-Cardo font-heading text-blue-500">
                    <span className="flex items-center">
                      {product?.price}.00 <BiEuro />
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Products;
