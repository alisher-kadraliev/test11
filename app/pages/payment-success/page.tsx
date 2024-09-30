// pages/payment-success.tsx
import { FC } from 'react';
import Head from 'next/head';

const PaymentSuccess: FC = () => {
  return (
    <>
      <Head>
        <title>Payment Successful</title>
        <meta name="description" content="Your payment was successful." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Payment Successful
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
