import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Nav from "../../Shared/Nav/Nav";
import ExploreBanner from "../Explore/Banner/ExploreBanner";

const PlaceOrder = () => {
  const [product, setProduct] = useState({});
  const { user } = useAuth();
  const { id } = useParams();
  const [orderData, setOrderData] = useState({
    name: user?.displayName || user?.email?.split("@")[0],
    email: user?.email,
    address: "Dhaka",
    quantity: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/glass/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const onBlurHandler = (e) => {
    const newData = { ...orderData };
    newData[e.target.name] = e.target.value;
    setOrderData(newData);
  };

  const makeOrder = (e) => {
    e.preventDefault();
    const finalData = {
      email: user?.email,
      order: {
        ...orderData,
        productId: product._id,
        status: "pending",
      },
      product: { ...product },
    };

    fetch("http://localhost:5000/order", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finalData),
    });
  };

  return (
    <>
      <Nav />
      <ExploreBanner>
        <div className="mt-10">
          <div
            style={{
              background: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))",
            }}
            className="py-8 px-6 shadow rounded-lg sm:px-10"
          >
            <h3 className="text-teal-500 text-4xl text-center mb-3">
              Thank you for choosing us!
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <img
                  src={product?.img}
                  alt=""
                  className="h-72 p-10 rounded-3xl"
                />

                <div className="">
                  <div className="text-white text-3xl">{product?.name}</div>
                  <div className="flex flex-col space-y-4 text-white md:p-5">
                    <div className="">Quantity: {orderData.quantity}</div>
                    <div className="">
                      {" "}
                      Total Price: $
                      {(product?.price * orderData.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={makeOrder}
                className="mb-0 space-y-3 flex flex-col items-center justify-center"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Delivery to
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={onBlurHandler}
                      defaultValue={orderData.name}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="focus:ring-teal-600 focus:border-teal-600 rounded-lg w-full"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={onBlurHandler}
                      defaultValue={orderData.email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="current-email"
                      required
                      className="rounded-lg focus:ring-teal-600 focus:border-teal-600 w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:px-5">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-white"
                  >
                    Shipping Address
                  </label>
                  <div className="mt-1">
                    <textarea
                      defaultValue={orderData.address}
                      onChange={onBlurHandler}
                      id="address"
                      name="address"
                      autoComplete="address"
                      required
                      className="rounded-lg focus:ring-teal-600 focus:border-teal-600 w-full"
                    />
                  </div>
                </div>

                <div className="w-full md:px-5">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-white"
                  >
                    Quantity:
                  </label>
                  <div className="mt-1">
                    <input
                      min={1}
                      max={10}
                      onChange={onBlurHandler}
                      defaultValue={orderData.quantity}
                      id="quantity"
                      name="quantity"
                      type="number"
                      autoComplete="current-quantity"
                      required
                      className="rounded-lg focus:ring-teal-600 focus:border-teal-600 w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-start">
                  <input
                    id="terms-and-privacy"
                    name="terms-and-privacy"
                    type="checkbox"
                    className="focus:ring-teal-600 focus:border-teal-600 text-teal-600"
                  />

                  <div className="">
                    <label
                      htmlFor="terms-and-privacy"
                      className="ml-2 text-sm text-white"
                    >
                      I agree to the{" "}
                      <Link
                        to="/"
                        className="text-teal-600 hover:text-teal-500"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/"
                        className="text-teal-600 hover:text-teal-500"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ExploreBanner>
    </>
  );
};

export default PlaceOrder;
