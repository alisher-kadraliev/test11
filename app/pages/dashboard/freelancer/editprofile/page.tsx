'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const EditProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankName, setBankName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalUsername, setPaypalUsername] = useState('');

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/freelancerprofileedit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          province,
          address,
          postalCode,
          paymentMethod,
          bankName,
          idNumber,
          accountNumber,
          paypalUsername,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      console.log('Changes saved');

      // Show toast notification
      toast('Profile updated successfully');

      // Redirect to dashboard or profile page
      router.push('/pages/dashboard/freelancer'); // Replace with actual dashboard URL
    } catch (error:any) {
      console.error('Error saving profile changes:', error.message);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <form className="bg-white shadow-md rounded-md p-6">
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Province */}
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Province
          </label>
          <select
            id="province"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">Select a province</option>
            <option value="Central Province">Central Province</option>
            <option value="Eastern Province">Eastern Province</option>
            <option value="Northern Province">Northern Province</option>
            <option value="North Western Province">North Western Province</option>
            <option value="North Central Province">North Central Province</option>
            <option value="Southern Province">Southern Province</option>
            <option value="Uva Province">Uva Province</option>
            <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
            <option value="Western Province">Western Province</option>
          </select>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a payment method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        {/* Bank Name */}
        {paymentMethod === 'Bank Transfer' && (
          <div className="mb-4">
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <select
              id="bankName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            >
              <option value="">Select a bank</option>
              <option value="Commercial Bank">Commercial Bank</option>
              <option value="Peoples Bank">Peoples Bank</option>
              <option value="Bank of Ceylon">Bank of Ceylon</option>
              <option value="DFCC Bank">DFCC Bank</option>
              <option value="Hatton National Bank">Hatton National Bank</option>
              <option value="National Development Bank">National Development Bank</option>
              <option value="Nations Trust Bank">Nations Trust Bank</option>
              <option value="Sampath Bank">Sampath Bank</option>
              <option value="Seylan Bank">Seylan Bank</option>
              <option value="Regional Development Bank">Regional Development Bank</option>
            </select>
          </div>
        )}

        {/* ID Number */}
        {paymentMethod === 'Bank Transfer' && (
          <div className="mb-4">
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">
              ID Number
            </label>
            <input
              id="idNumber"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        )}

        {/* Bank Account Number */}
        {paymentMethod === 'Bank Transfer' && (
          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
        )}

        {/* PayPal Username */}
        {paymentMethod === 'PayPal' && (
          <div className="mb-4">
            <label htmlFor="paypalUsername" className="block text-sm font-medium text-gray-700">
              PayPal Username
            </label>
            <input
              id="paypalUsername"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              value={paypalUsername}
              onChange={(e) => setPaypalUsername(e.target.value)}
            />
          </div>
        )}

        {/* Save Changes Button */}
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Error message display */}
        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProfilePage;

