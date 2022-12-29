import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function Login() {
    //test
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        if (codeParam && localStorage.getItem("accessToken") === null) {
            async function getAccessToken() {
                await fetch(
                    "http://localhost:4000/getAccessToken?code=" + codeParam,
                    {
                        method: "GET",
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.access_token) {
                            localStorage.setItem(
                                "accessToken",
                                data.access_token
                            );
                        }
                    });
                await fetch("http://localhost:4000/getUserData", {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log("data.id: ", data.id);
                        localStorage.setItem("userId", data.id);
                        fetch("http://52.194.161.226:8080/api/join", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: data.id,
                                email: data.email,
                            }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                localStorage.setItem(
                                    "webAccessToken",
                                    data.data.token
                                );
                                localStorage.setItem(
                                    "webrefreshToken",
                                    data.data.refreshToken
                                );
                                //test
                                navigate(from, { replace: true });
                                console.log(
                                    "lookL :",
                                    localStorage.getItem("webAccessToken")
                                );
                                const { setAuth } = useAuth();
                                setAuth({
                                    webAcessToken:
                                        localStorage.getItem("webAccessToken"),
                                    userId: localStorage.getItem("userId"),
                                });
                            });
                    });
            }

            getAccessToken();

            setTimeout(() => {
                history.back();
            }, [1500]);
        }
    }, []);
}
