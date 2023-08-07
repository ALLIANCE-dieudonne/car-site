/* eslint-disable tailwindcss/classnames-order */
"use client";
import { carProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import { tap } from "node:test/reporters";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { CarDetails } from ".";
import { PuffLoader } from "react-spinners";

interface carCardProps {
  car: carProps;
}

const CarCard = ({ car }: carCardProps) => {
  const { city_mpg, year, model, transmission, drive, make } = car;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [car]);

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make}
          {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative sm:w-full sm:h-40 my-3 w-[80%] h-30 object-contain">
        {isLoading ? (
          <PuffLoader
            size={55}
            color="#4066ff"
            aria-label="puff-loading"
            className="m-auto"
          />
        ) : (
          <LazyLoadImage
            src={generateCarImageUrl(car)}
            alt="hero image"
            fill
            priority
            className="object-contain"
            effect="blur"
          />
        )}
      </div>

      <div className="relative w-full pt-3">
        <div className="text-gray flex w-full justify-between group-hover:invisible">
          <div className="flex flex-col justify-center items-center gap-2">
            <LazyLoadImage
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steelimg wheel"
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <LazyLoadImage src="/tire.svg" width={20} height={20} alt="tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <LazyLoadImage
              src="/gas.svg"
              width={20}
              height={20}
              alt="steelimg wheel"
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue "
            textStyle="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setOpen(true)}
            btnType="button"
          />
        </div>
      </div>
      <CarDetails open={open} closeModal={() => setOpen(false)} car={car} />
    </div>
  );
};
export default CarCard;
