"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { slug: property_name } = useParams();
  console.log(property_name);
  return (
    <div>
      <nav>
        <img src="../image/Logo.png" alt="Logo" />

        <img
          src="/image/hamburger.png"
          alt="Logo"
          className="menu-icon"
          width={20}
          height={20}
        />
        <div className="Nyangu">
          <a href="">About</a>
          <a href="">Rentals</a>
          <a href="">Manage Listings</a>
          <a href="">Rentals</a>
          <a href="">Knowledge Town</a>
        </div>
        <div className="Nyangu">
          <a href="">Post a property</a>
          <a href="">log in</a>
          <button className="btn">Sign Up</button>
        </div>
      </nav>

      <div className="grid md:grid-cols-[2fr_1fr] gap-3 `min-h-[515px]">
        <div className="h-full">
          <img
            src={"/image/Figma_Image1.png"}
            alt="property"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
          <img
            src={"/image/Property_Image2.png"}
            alt="property"
            className="w-full h-full object-cover rounded-[10px]"
          />

          <img
            src={"/image/Property_Image3.png"}
            alt="property"
            className="w-full h-full object-cover rounded-[10px]"
          />

          <img
            src={"/image/Property_Image4.png"}
            alt="property"
            className="w-full h-full object-cover rounded-[10px]"
          />

          <img
            src={"/image/Property_Image5.png"}
            alt="property"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-8 w-11/12 mx-auto md:w-10/12">
        <div>
          <h1 className="text-3xl font-bold">
            Fully Furnished 3 Bedroom Apartment
          </h1>

          <p className="text-gray-500 mt-2">
            Lekki phase 1, Lagos State, Nigeria
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="border rounded-full px-4 py-2 flex items-center gap-2">
              <Image src={"/image/guest_icon.png"} alt="" width={20} height={20} />
              <p>4 Guest</p>
            </div>
            <div className="border rounded-full px-4 py-2 flex items-center gap-2">
              <Image src={"/image/chair_icon.png"} alt="" width={20} height={20} />
              <p>1 sitting room</p>
            </div>
            <div className="border rounded-full px-4 py-2 flex items-center gap-2">
              <Image src={"/image/beds_icon.png"} alt="" width={20} height={20} />
              <p>2 Beds</p>
            </div>
            <div className="border rounded-full px-4 py-2 flex items-center gap-2">
              <Image src={"/image/bathtub_icon.png"} alt="" width={20} height={20} />
              <p>2 Baths</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-10">Description</h2>

          <p className="text-gray-600 leading-8 mt-4">
            Experience Modern living in this beautifully Furnished 3-bedroom
            apartment located in the heart of Lekki Phase 1. Featuring a
            spacious living room, fully equipped kitchen, and en-suite bedrooms,
            this home offers comfort and style. With 24/7 power supply,
            high-speed wifi, private parking, and close proximity to
            supermarkets, cafes, and public transport, it's the perfect fit for
            working professionals or small families seeking conveinence and
            peace of mind.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
          <p className="text-sm text-gray-500">Total Rent</p>
          <h2 className="text-x1 font-semibold mb-6">₦20,000,000.00 year
            <span className="text-base font-normal text-gray-500"></span>
          </h2>
          
          <hr className="my-6"></hr>

          <h3 className="font-semibold mb-4">
            Price Breakdown
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Price:</span>
              <span>₦10,000,000.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Agent Fee:</span>
              <span>₦5,000,000.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Nyangu Service</span>
              <span>₦5,000,000.00</span>
            </div>
          </div>

         <button className="w-full bg-green-800 text-white py-3 rounded-lg mt-8 hover:bg-green-900"> Request to tour </button>
        
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="border border-gray-700 rounded-full flex items-center  justify-between p-2">
            <div className="flex items-center gap-2">
              <Image src={"/image/wifi_icon.png"} alt="" width={20} height={20} />
              <p>Wifi</p>
            </div>

            <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/Kitchen_icon.png"} alt="" width={20} height={20} />
             <p>Kitchen</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/workspace_icon.png"} alt="" width={20} height={20} />
             <p>Workspace</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/Free parking_icon.png"} alt="" width={20} height={20} />
             <p>Free Parking</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/washer_icon.png"} alt="" width={20} height={20} />
             <p>Washer</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-0.8 md:p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/Airconditioning_icon.png"} alt="" width={20} height={20} />
             <p>Air Conditioning</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>

          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/refrigerator_icon.png"} alt="" width={20} height={20} />
             <p>Refrigerator</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>


          <div className="border border-gray-700 rounded-full flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
             <Image src={"/image/Backyard_icon.png"} alt="" width={20} height={20} />
             <p>Backyard</p>
           </div>

           <Image src={"/image/check_circle.png"} alt="" width={20} height={20} />
          </div>


        </div>
      </div>

    </div>
  );
};

export default page;
