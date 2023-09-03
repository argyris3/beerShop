import { Link } from 'react-router-dom';
import HomeCategories from './HomeCategories';
import HomeProductTrending from './HomeProductTrending';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

// const offers = [
//   {
//     name: 'Explore our World',
//     description: 'Get an exclusive $5 off code',
//     href: '#',
//   },
//   {
//     name: 'Free Delivery ',
//     description: 'Order above $50',
//     href: '#',
//   },
//   {
//     name: 'Sign up for our newsletter',
//     description: '15% off your first order',
//     href: '#',
//   },
// ];

// const perks = [
//   {
//     name: 'Free delivery over 50$',
//     imageUrl:
//       'https://img.freepik.com/free-vector/best-quality-beer-illustration-with-glass-tankard-dark-beer-lager-with-wonderful-frothy-head-overflowing-glass-arched-text-vector-illustration-isolated-white_1284-43342.jpg?w=1380&t=st=1686490298~exp=1686490898~hmac=ab79b489e2112f3b2a0862f429379aefa40e107516d6c88cc26396aeeb254113',
//     description: 'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
//   },
//   {
//     name: 'Coupons for discount',
//     imageUrl:
//       'https://img.freepik.com/free-vector/beer-light-white-background-set-different-sorts-glass-illustration_1284-51531.jpg?w=1800&t=st=1686490413~exp=1686491013~hmac=7c746d51c65685373207ffeb134132fd80ce62dc6466bae80ac06fef663c867f',
//     description:
//       'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
//   },
//   {
//     name: 'Unique Recipes',
//     imageUrl:
//       'https://img.freepik.com/free-vector/worry-less-drink-beer-illustration_53876-43343.jpg?w=1380&t=st=1686490569~exp=1686491169~hmac=4b9766c7d93f737b6b3ee4587d1cc13d94d7a4edb81fc494848fc70237c698ca',
//     description: 'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
//   },
//   {
//     name: 'Homebrewery Beers',
//     imageUrl:
//       'https://img.freepik.com/free-vector/hand-drawn-design-international-beer-day_23-2148573739.jpg?w=1380&t=st=1686490514~exp=1686491114~hmac=925322d01de75e4e4d829f248dab2a8016b47732b5921015df0b62721a19d397',
//     description: 'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
//   },
// ];
export default function Example() {
  return (
    <div className="bg-gradient-to-l from-indigo-400 ">
      <main>
        {/* Hero */}
        <div className="  flex flex-col border-b border-gray-200 lg:border-0">
          {/* <nav aria-label="Offers" className="order-last lg:order-first">
            <div className="mx-auto max-w-7xl lg:px-8">
              <ul
                role="list"
                className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
              >
                {offers.map((offer) => (
                  <li key={offer.name} className="flex flex-col ">
                    <a
                      href={offer.href}
                      className="relative flex flex-1 flex-col justify-center bg-green-50  py-6 px-4 text-center focus:z-10"
                    >
                      <p className="text-sm text-gray-500">{offer.name}</p>
                      <p className="font-semibold text-gray-900">{offer.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav> */}

          <div className="relative">
            <div aria-hidden="true" className="absolute hidden h-full w-1/2  lg:block" />
            <div className="relative bg-gray-100 lg:bg-transparent">
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8 ">
                <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                  <div className="lg:pr-16">
                    <h1 className="text-4xl font-Cardo font-bold tracking-wide text-gray-900 sm:text-5xl xl:text-6xl">
                      Homebrewery in Ptolemaida
                    </h1>
                    <p className="mt-4 font-Philosopher text-2xl text-gray-600 tracking-wide">
                      Inspiring Beers with unique recipes
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/all-categories"
                        className="inline-block font-Cardo text-lg rounded-md border border-transparent p-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">  
                      
                        Explore Our Beers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-48 w-full  lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2 sm:h-full">
              <img
                src="
                https://media.gettyimages.com/id/1040641432/photo/bottle-and-glass-beer-with-brewing-ingredients.jpg?s=612x612&w=0&k=20&c=wVnzMRcFot8LC3piLs54_Jnv6TcjgavVFJVZQDBnLk4="
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* <div className="relative overflow-hidden">
          
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Get 25% off during our one-time sale
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                Most of our products are limited releases that won't come back. Get your favorite items while they're in
                stock.
              </p>
              <a
                href="#"
                className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                Get access to our one-time sale
              </a>
            </div>
          </section>
        </div> */}
      </main>
      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-8xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0  ">
            <h2 id="category-heading" className="text-2xl font-Cardo font-bold tracking-tight text-gray-900  ">
              Shop by Category
            </h2>
            <Link
              to="/all-categories"
              className="hidden font-Philosopher text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          {/* home categories */}
          <HomeCategories />
        </section>
        {/* Home trending trending */}
        <HomeProductTrending />

        {/* info */}
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
      </main>
    </div>
  );
}
