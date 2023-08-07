/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/classnames-order */

"use client";
import { CarDetailsProps } from "@/types";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { generateCarImageUrl } from "@/utils";
import { PuffLoader } from "react-spinners";

const CarDetails = ({ open, closeModal, car }: CarDetailsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [car]);
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration -300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration -300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="Close image"
                      height={20}
                      width={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      {isLoading ? (
                        <PuffLoader
                          size={50}
                          color="#fff"
                          aria-label="puff-loading"
                          className="m-auto"
                        />
                      ) : (
                        <Image
                          src={generateCarImageUrl(car)}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <LazyLoadImage
                          src={generateCarImageUrl(car, "29")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                          effect="blur"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg ">
                        <LazyLoadImage
                          src={generateCarImageUrl(car, "33")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                          effect="blur"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <LazyLoadImage
                          src={generateCarImageUrl(car, "13")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                          effect="blur"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>
                    <div className="mt-3 flex flex-wrap">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 text-right w-full"
                          key={key}
                        >
                          <h4>{key}</h4>
                          <p className="text-black-100 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default CarDetails;
