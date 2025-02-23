import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [winSize, setWinSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWinSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return winSize;
}

export default useWindowSize;