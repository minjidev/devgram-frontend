import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useFeedBestData } from "@hooks/useMainData";

function PrevBtn({ slickPrev }) {
    return (
        <button
            className="absolute top-0 bottom-0 my-auto -left-6
            btn btn-squre bg-white border-none opacity-80 hidden sm:block hover:bg-white focus:bg-white
            "
            onClick={slickPrev}
        >
            <ChevronLeftIcon className="text-black w-3 h-3 sm:w-4 sm:h-4" />
        </button>
    );
}

function NextBtn({ slickNext }) {
    return (
        <button
            className="absolute top-0 bottom-0 my-auto -right-4
            btn btn-squre bg-white border-none opacity-80 hidden sm:block hover:bg-white focus:bg-white"
            onClick={slickNext}
        >
            <ChevronRightIcon className="text-black w-3 h-3 sm:w-4 sm:h-4" />
        </button>
    );
}

function FeedBest() {
    const API_URL_FEED_BEST = "http://localhost:3000/feedbest";
    const { data, error, isSuccess } = useFeedBestData(API_URL_FEED_BEST);
    const slider = useRef(null);

    const next = () => {
        slider.current.slickNext();
    };
    const previous = () => {
        slider.current.slickPrev();
    };

    if (error) return <div>{error}</div>;

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        swipeToSlide: true,
        arrows: false,
        touchMove: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    if (isSuccess)
        return (
            <div className="flex flex-col py-3 px-10 lg:px-32">
                {/* 타이틀 */}
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold italic pb-3">
                        DESK SETUPS!
                    </h2>
                    <button className="text-xs btn btn-xs btn-outline rounded-full hover:bg-gray-200 hover:text-black">
                        <Link to="/feed">더보기</Link>
                        <ChevronRightIcon className="w-2 h-2 ml-1 stroke-2" />
                    </button>
                </div>
                {/* 베스트 피드 */}
                <div className="relative">
                    <Slider ref={slider} {...settings}>
                        {data.map((d) => (
                            <div
                                key={d.id}
                                className="overflow-hidden rounded pr-3"
                            >
                                <Link to={`/social/feed/${d.id}`}>
                                    {" "}
                                    {/*  api에서 구분 id 아닌 고유한 feed_id 사용 필요 */}
                                    <img
                                        src={d.img_url}
                                        alt={d.name}
                                        className="relative opacity-80 w-full rounded"
                                    />
                                </Link>
                            </div>
                        ))}
                    </Slider>
                    <PrevBtn slickPrev={previous} />
                    <NextBtn slickNext={next} />
                </div>
            </div>
        );
}

export default FeedBest;
