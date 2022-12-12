import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductsCarouselData } from "@hooks/useAdminData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";

const Container = tw(Slider)`
    .slick-list {
        p-0
    }
`;

function PrevBtn() {
    return (
        <button className="slick-prev slick-arrow absolute top-1/2 -translate-y-2/4 -left-8 px-10">
            <ChevronLeftIcon className="w-10 h-10" />
        </button>
    );
}

function NextBtn() {
    return (
        <button className="slick-next slick-arrow absolute bottom-1/2 translate-y-2/4 -right-8 px-10">
            <ChevronRightIcon className="w-10 h-10" />
        </button>
    );
}

function CarouselRanking() {
    const API_URL_CAROUSEL = "http://localhost:3000/best";
    const { data, isLoading, error } =
        useProductsCarouselData(API_URL_CAROUSEL);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        swipeToSlide: true,
        arrows: true,
        className: "slider",
        centerMode: true,
        touchMove: true,
        prevArrow: <PrevBtn />,
        nextArrow: <NextBtn />,
    };
    return (
        <div>
            <Slider {...settings}>
                {data.map((d) => (
                    <div
                        key={d.id}
                        className="flex justify-center items-center overflow-hidden"
                    >
                        <img
                            src={d.img_url}
                            alt={d.name}
                            className="relative opacity-80 min-w-full min-h-full shrink-0"
                        />
                        <h3 className="absolute top-20 p-10">
                            <span className="text-4xl text-black font-bold">
                                {d.name}
                            </span>
                        </h3>
                        <h4 className="absolute top-44 px-10">
                            <span className="text-xl text-black">
                                {d.description}
                            </span>
                        </h4>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default CarouselRanking;
