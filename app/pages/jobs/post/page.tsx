'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaSave, FaTimes } from 'react-icons/fa';

interface FormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  files: FileList;
}

const JobPostPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('shortDescription', data.shortDescription);
    formData.append('fullDescription', data.fullDescription);
    formData.append('price', data.price.toString());
    
    for (let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i]);
    }

    try {
      const response = await fetch('/api/jobpost', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/pages/jobs/view');
      } else {
        const errorData = await response.json();
        console.error('Failed to post job:', errorData);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Post Your Job</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
            <input 
              id="title"
              {...register('title', { required: true, maxLength: 35 })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">Title is required (max 35 characters)</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-gray-700 text-sm font-bold mb-2">Short Description</label>
            <textarea 
              id="shortDescription"
              {...register('shortDescription', { required: true, maxLength: 250 })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            {errors.shortDescription && <p className="text-red-500 text-xs mt-1">Short description is required (max 250 characters)</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="fullDescription" className="block text-gray-700 text-sm font-bold mb-2">Full Description</label>
            <textarea 
              id="fullDescription"
              {...register('fullDescription', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            {errors.fullDescription && <p className="text-red-500 text-xs mt-1">Full description is required</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input 
              id="price"
              type="number"
              {...register('price', { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">Price is required</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="files" className="block text-gray-700 text-sm font-bold mb-2">Attach Files</label>
            <input 
              id="files"
              type="file"
              multiple
              {...register('files')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

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
    </div>
  );
};

export default JobPostPage;
