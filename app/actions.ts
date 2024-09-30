"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { profile } from "console";


export async function FreelancerEdit(formData:FormData) {
    const profilePic = formData.get("image") as File
    const firstName = formData.get("fname") as string
    const lastName = formData.get("lname") as string
    const address = formData.get("address") as string
    const province = formData.get("province") as string
    const paymentMethod = formData.get("paymentMethod") as string
    const bankName = formData.get("bankName") as string
    const idNumber = formData.get("idNumber") as string
    const accountNumber = formData.get("accountNumber") as string
    const paypalUsername = formData.get("paypalUsername") as string
    const description = formData.get("description") as string
    const freelancerId = formData.get("freelancerId") as string

    const { data: imageData } = await supabase.storage
    .from("profileimages")
    .upload(`${profilePic.name}-${new Date()}`, profilePic, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

    const data = await prisma.freelancer.update({
      where: {
        id: freelancerId
      },
      data:{
        profilePic: imageData?.path,
        firstName: firstName,
        lastName: lastName,
        province: province,
        address: address,
        paymentMethod: paymentMethod,
        bankName: bankName,
        idNumber: idNumber,
        accountNumber: accountNumber,
        paypalUsername: paypalUsername,
        description: description,
        
        
      }  
    });
    return redirect(`/create/${freelancerId}/freelancerproedit`);
}
  
export async function createFreelancerData({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // Check if the user's role is 'FREELANCER'
  if (user && user.roleName === 'FREELANCER') {
    return redirect(`/create/${userId}/freelancerproedit`);
  }

  // Handle the case when the user is not a freelancer
  return { message: "User is not a freelancer" };
}
