"use client";
import { SearchManufacturerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useState, Fragment } from "react";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [querry, setQuerry] = useState("");
  const filteredManufacturers =
    querry === ""
      ? manufacturers
      : manufacturers
          .map((item) => ({
            item,
            startsWithQuery: item
              .toLowerCase()
              .replace(/\s+/g, "")
              .startsWith(querry.toLowerCase().replace(/\s+/g, "")),
          }))
          .sort((a, b) => {
            if (a.startsWithQuery && !b.startsWithQuery) {
              return -1;
            } else if (!a.startsWithQuery && b.startsWithQuery) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((item) => item.item);

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              alt="car logo"
              width={20}
              height={20}
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Vokswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuerry(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuerry("")}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && querry !== "" ? (
                <Combobox.Option
                  value={querry}
                  className="search-manufacturer__option"
                >
                  Nothing Found
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-grey-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
export default SearchManufacturer;
