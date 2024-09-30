'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaSave, FaTimes } from 'react-icons/fa';

interface FormData {
  image: FileList;
  description: string;
  fname: string;
  lname: string;
  address: string;
  province: string;
  paymentMethod: string;
  bankName?: string;
  fullName?: string;
  accountNumber?: string;
  idNumber?: string;
  paypalUsername?: string;
}

const provinces = [
  'Central Province', 'Eastern Province', 'Northern Province', 'Southern Province',
  'Western Province', 'North Western Province', 'North Central Province', 
  'Uva Province', 'Sabaragamuwa Province'
];

const banks = [
  'Peoples Bank', 'Bank of Ceylon', 'Commercial Bank', 'DFCC Bank', 
  'Hatton National Bank', 'National Development Bank', 'Nations Trust Bank', 
  'Sampath Bank', 'Seylan Bank', 'Regional Development Bank'
];

const ProfileEditPage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('Bank Account');
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('description', data.description);
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('address', data.address);
    formData.append('province', data.province);
    formData.append('paymentMethod', data.paymentMethod);
    if (data.paymentMethod === 'Bank Account') {
      formData.append('bankName', data.bankName || '');
      formData.append('fullName', data.fullName || '');
      formData.append('accountNumber', data.accountNumber || '');
      formData.append('idNumber', data.idNumber || '');
    } else if (data.paymentMethod === 'Paypal') {
      formData.append('paypalUsername', data.paypalUsername || '');
    }

    try {
      const response = await fetch('/api/freelancerprofileform', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/pages/freelancer/${data.id}/profile`); // Redirect using the ID
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedPaymentMethod = watch('paymentMethod', 'Bank Account');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
            <label className="relative cursor-pointer">
              <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                {profileImage ? (
                  <Image 
                    src={profileImage} 
                    alt="Profile Image" 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-gray-400 text-center">Image must be 1x1 ratio</span>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                {...register('image', { required: true })}
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">Profile image is required</p>}
            </label>
          </div>
          <div className="w-full md:w-2/3 md:pl-6">
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea 
                id="description"
                {...register('description', { required: true, maxLength: 300 })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">Description is required (max 300 characters)</p>}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="fname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input 
            id="fname"
            {...register('fname', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.fname && <p className="text-red-500 text-xs mt-1">First name is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input 
            id="lname"
            {...register('lname', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lname && <p className="text-red-500 text-xs mt-1">Last name is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input 
            id="address"
            {...register('address', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">Address is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2">Province</label>
          <select 
            id="province"
            {...register('province', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          {errors.province && <p className="text-red-500 text-xs mt-1">Province is required</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block text-gray-700 text-sm font-bold mb-2">Payment Withdrawal Method</label>
          <select 
            id="paymentMethod"
            {...register('paymentMethod', { required: true })}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Bank Account">Bank Account</option>
            <option value="Paypal">Paypal</option>
          </select>
          {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">Payment method is required</p>}
        </div>

        {paymentMethod === 'Bank Account' && (
          <>
            <div className="mb-4">
              <label htmlFor="bankName" className="block text-gray-700 text-sm font-bold mb-2">Bank Name</label>
              <select 
                id="bankName"
                {...register('bankName', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {banks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
              {errors.bankName && <p className="text-red-500 text-xs mt-1">Bank name is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input 
                id="fullName"
                {...register('fullName', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">Full name is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="accountNumber" className="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
              <input 
                id="accountNumber"
                {...register('accountNumber', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.accountNumber && <p className="text-red-500 text-xs mt-1">Account number is required</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="idNumber" className="block text-gray-700 text-sm font-bold mb-2">ID Number</label>
              <input 
                id="idNumber"
                {...register('idNumber', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.idNumber && <p className="text-red-500 text-xs mt-1">ID number is required</p>}
            </div>
          </>
        )}

        {paymentMethod === 'Paypal' && (
          <div className="mb-4">
            <label htmlFor="paypalUsername" className="block text-gray-700 text-sm font-bold mb-2">Paypal Username or Email</label>
            <input 
              id="paypalUsername"
              {...register('paypalUsername', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.paypalUsername && <p className="text-red-500 text-xs mt-1">Paypal username or email is required</p>}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button type="button" onClick={() => router.back()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaTimes className="mr-2" />
            Cancel
          </Button>
          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FaSave className="mr-2" />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditPage;
