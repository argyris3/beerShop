import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition, RadioGroup } from '@headlessui/react';
import ErrorMsg from '../../ErrorMsg/ErrorMsg.js';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon, ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import Products from './Products.js';
import { useSearchParams } from 'react-router-dom';
import baseURL from '../../../utils/baseURL';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../../redux/slices/products/productSlices';
import { fetchedTypesAction } from '../../../redux/slices/categories/TypeSlice';
import LoadingComponent from '../../LoadingComp/LoadingComponent.js';
import NoDataFound from '../../NoDataFound/NoDataFound.js';
import { BsFacebook, BsTwitter, BsInstagram, BsFillTrainLightrailFrontFill } from 'react-icons/bs';

// const sortOptions = [
//   { name: 'Most Popular', href: '#', current: true },
//   { name: 'Best Rating', href: '#', current: false },
//   { name: 'Newest', href: '#', current: false },
//   { name: 'Price: Low to High', href: '#', current: false },
//   { name: 'Price: High to Low', href: '#', current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductsFilters() {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  //get query string
  const [params, setParams] = useSearchParams();
  const category = params.get('category');
  //filters

  //BUILD UP URL
  let productUrl = `${baseURL}/products`;
  if (category) {
    productUrl = `${baseURL}/products?category=${category}`;
  }

  console.log(category);
  console.log(productUrl);

  //get store data
  const {
    products: { products },
    loading,
    error,
  } = useSelector((state) => state?.products);

  console.log(products);

  const [type, setType] = useState('');

  if (type) {
    productUrl = `${productUrl}&type=${type}`;
  }

  //fetch all products
  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch, category, type]);
  //fetch types
  useEffect(() => {
    dispatch(
      fetchedTypesAction({
        url: productUrl,
      })
    );
  }, [dispatch]);

  //get store data
  const {
    types: { types },
  } = useSelector((state) => state?.types);

  function remove(array) {
    let a = [];

    array.map((x) => (!a.includes(x) ? a.push(x) : ''));
    console.log(a);

    return a;
  }

  return (
    <div className="bg-gradient-to-l from-zinc-300">
      <div>
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Mobile Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {/*  */}

                    {/*  end price categories section  */}

                    {/* product brand categories section categories section */}
                    <Disclosure as="div" key="disclosure" className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-Cardo text-gray-900">Beer Type</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-2">
                              {products?.map((product) => (
                                <div key={type._id} className="flex items-center">
                                  <input
                                    onClick={() => setType(remove([product?.type]))}
                                    name="type"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 font-Cardo min-w-0 flex-1 text-gray-500">
                                    {remove([product?.type])}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/*  end product brand categories section */}

                    {/*  end product size categories section */}
                  </form>
                  {/* end of mobile filters */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline font-Cardo justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-Cardo tracking-tight text-gray-900">Beer Filters</h1>
            {/* sort */}
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  {/* <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button> */}
                </div>

                {/* sort item links */}
                {/* <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {/* <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items> */}
                {/* </Transition> */}
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Desktop  Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {/* product brand categories section categories section */}
                <Disclosure as="div" key="disclosure" className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-gradient-to-l from-zinc-100 px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-Cardo text-gray-900">Beer Types</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-2">
                          {products?.map((product) => (
                            <div key={type._id} className="flex items-center">
                              <input
                                onClick={() => setType([product?.type])}
                                name="type"
                                type="radio"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 font-Cardo min-w-0 flex-1 text-gray-500">
                                {remove([product?.type])}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/*  end product brand categories section */}

                {/*  end product size categories section */}
              </form>

              {/* Product grid */}
              {loading ? (
                <LoadingComponent />
              ) : error ? (
                <ErrorMsg messsage={error?.message} />
              ) : products?.length <= 0 ? (
                <NoDataFound />
              ) : (
                <Products products={products} />
              )}
            </div>
          </section>
        </main>
        <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-black ">
          <div className="mx-auto max-w-7xl py-14 px-2 sm:px-4 sm:py-22 lg:px-5">
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
              <div className="flex flex-col ">
                <h1 className="text-3xl font-Cardo text-white font-semibold tracking-wider py-4 uppercase ">
                  Location
                </h1>
                <p className="text-white font-Cardo font-semibold tracking-wide capitalize">
                  Soulioy 80,
                  <br />
                  Ptolemaida 50200,
                  <br />
                  Greece
                </p>
              </div>
              <div className="flex flex-col py-4">
                <h1 className="text-white font-Cardo uppercase text-3xl font-semibold tracking-wider">find us on..</h1>
                <div className="flex gap-7 py-4">
                  <BsFacebook className="text-white cursor-pointer text-3xl" />
                  <BsTwitter className="text-white cursor-pointer text-3xl" />
                  <BsInstagram className="text-white cursor-pointer text-3xl" />
                </div>
              </div>
              <div className="flex flex-col py-4">
                <h1 className="text-white font-Cardo text-3xl font-semibold uppercase tracking-wider">CONTACT US</h1>
                <p className="text-white font-Cardo text-xl tracking-tight pt-4">60789665364-246345757</p>
                <p className="text-white font-normal text-xl font-Cardo">argy@gmail.com</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-white font-Philosopher text-center text-lg tracking-wide">
              Bacillus MicroBrewery Web Developers Team
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
