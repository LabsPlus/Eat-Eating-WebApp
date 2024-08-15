"use client";
import { useRouter } from "next/router";
import Home from "../views/home-page/HomePage";

export default function RouterHandler(){

    const router = useRouter();
    const { route } = router.query;

    switch(route){
        case "home":
            return <Home />
        default:
            return <Home />
    }

}