import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductsCarouselData } from "@hooks/useAdminData";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function PrevBtn({ slickPrev }) {
    return (
        <button
            className="absolute top-0 bottom-0 my-auto left-0 px-10"
            onClick={slickPrev}
        >
            <ChevronLeftIcon className="w-6 h-6 sm:w-10 sm:h-10 z-1" />
        </button>
    );
}

function NextBtn({ slickNext }) {
    return (
        <button
            className="absolute top-0 bottom-0 my-auto px-10 right-0"
            onClick={slickNext}
        >
            <ChevronRightIcon className="w-6 h-6 sm:w-10 sm:h-10" />
        </button>
    );
}

function CarouselRanking() {
    const API_URL_CAROUSEL = "http://localhost:3000/best";
    const { data, error, isSuccess } =
        useProductsCarouselData(API_URL_CAROUSEL);
    const slider = useRef(null);
    const next = () => {
        slider.current.slickNext();
    };
    const previous = () => {
        slider.current.slickPrev();
    };

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
        arrows: false,
        touchMove: true,
    };
    if (isSuccess)
        return (
            <div className="relative">
                <Slider ref={slider} {...settings}>
                    {data.map((d) => (
                        <div
                            key={d.id}
                            className="h-[65vw] md:h-[35vw] lg:h-[25vw] overflow-hidden"
                        >
                            {/* api에서 구분 id 아닌 고유한 product_id 사용 필요 */}
                            <Link to={`products/${d.id}`}>
                                <img
                                    src={d.img_url}
                                    alt={d.name}
                                    className="relative opacity-80 min-w-full min-h-full object-cover lg:-top-64"
                                />
                            </Link>
                            <div className="absolute px-14 top-10 sm:px-32 sm:top-20 left-0">
                                <h3 className="text-2xl mb-2 sm:text-2xl md:text-4xl text-black font-bold break-all">
                                    {d.name}
                                </h3>
                                <h4 className="text-md sm:text-md md:text-xl text-black break-all">
                                    {d.description}
                                </h4>
                            </div>
                        </div>
                    ))}
                </Slider>
                <PrevBtn slickPrev={previous} />
                <NextBtn slickNext={next} />
            </div>
        );
}
export default CarouselRanking;
