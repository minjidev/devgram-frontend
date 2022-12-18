import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="bg-white dark:bg-gray-900 h-full flex justify-center items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-auto lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-point-blue dark:text-primary-500">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Pages Not Found.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Sorry, we can't find that page.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex text-white bg-point-blue hover:bg-blue-700-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
