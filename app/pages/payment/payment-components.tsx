'use client'

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/convertToSubcurrency';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function PaymentComponents() {
    const [amount, setAmount] = useState<number | null>(null);
    const [freelancerName, setFreelancerName] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchJobData = async () => {
            const jobId = searchParams.get('jobId');
            const freelancerNameParam = searchParams.get('freelancerName');

            if (!jobId) {
                console.error('Job ID is missing.');
                return;
            }

            try {
                const response = await fetch(`/api/paymentdetails/job/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job data');
                }
                const data = await response.json();
                console.log('Received job data:', data); // Log the data
                setAmount(data.price);
                setFreelancerName(freelancerNameParam || '');
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        fetchJobData();
    }, [searchParams]);

    if (amount === null) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">{freelancerName}</h1>
                <h2 className="text-2xl">
                    has requested <span className="font-bold">${amount}</span>
                </h2>
            </div>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubcurrency(amount),
                    currency: 'usd',
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </main>
    );
}

