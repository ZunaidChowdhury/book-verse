"use client";


import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function ThemeProvider({
    children,
}) {
    const mode = useSelector((state) => state.theme.mode);


    useEffect(() => {
        document.documentElement.dataset.theme = mode;
    }, [mode]);


    return children;
}
