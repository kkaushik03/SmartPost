import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Starfield(props) {
    // Values for customization
    const {
        speedFactor = 0.05,
        backgroundColor = "#0E0D0D",
        starColor = [116, 104, 252],
        starCount = 3500,
        starSize = 3,
    } = props;

    useEffect(() => {
    const canvas = document.getElementById("starfield");
    
    // Check for canvas element exists and get 2D rendering
    if (canvas) {
        const c = canvas.getContext("2d");
        
        if (c) {
            // Initialize width and height and set it to match with window's dimension
            let w = window.innerWidth;
            let h = window.innerHeight;

            const setCanvasExtents = () => {
                canvas.width = w;
                canvas.height = h;
            };

            setCanvasExtents();

            window.onresize = () => {
                setCanvasExtents();
            };

            // Create array of star with random positions
            const makeStars = (count) => {
                const out = [];
                for (let i = 0; i < count; i++) {
                    const s = {
                        x: Math.random() * 1600 - 800, // Random x position
                        y: Math.random() * 900 - 450, // Random y position
                        z: Math.random() * 1000, // Random depth
                    };
                    out.push(s)
                }
                return out;
            };

            let stars = makeStars(starCount);

            const clear = () => {
                c.fillStyle = backgroundColor;
                c.fillRect(0, 0, canvas.width, canvas.height);
            };
            
            // Draw star on canvas with a given brightness
            const putPixel = (x, y, brightness) => {
                const rgb = "rgba(" + starColor[0] + "," + starColor[1] + "," + starColor[2] + "," + brightness + ")";
                c.fillStyle = rgb;
                c.fillRect(x, y, starSize, starSize);
            };   
            
            // Move the stars by given distance along the z-axis
            const moveStars = (distance) => {
                const count = stars.length;
                for (let i = 0; i < count; i ++) {
                    const s = stars[i];
                    s.z -= distance;
                    while (s.z <= 1) {
                        s.z += 1000;
                    };
                };
            };
            
            // Store prev animation frame's timestamp
            let prevTime;

            // Initialize animation loop
            const init = (time) => {
                prevTime = time;
                requestAnimationFrame(tick);
            };
            
            // Handle animation frame
            const tick = (time) => {
                let elapsed = time - prevTime;
                prevTime = time; 

                moveStars(elapsed * speedFactor);

                clear();
                
                // Center x, y coordinate
                const cx = w / 2;
                const cy = h / 2;

                const count = stars.length;

                // Loop through each star and draw it on canvas
                for (let i = 0; i  < count; i++) {
                    const star = stars[i];

                    const x = cx + star.x / (star.z * 0.001);
                    const y = cy + star.y / (star.z * 0.001);

                    // Skip stars that are out of bounds
                    if (x < 0 || x >= w || y < 0 || y >= h) {
                        continue;
                    }

                    const d = star.z / 1000.0;
                    const b = 1 - d * d * d;

                    putPixel(x, y, b);
                }
                requestAnimationFrame(tick);
            };
            
            // Start animation loop
            requestAnimationFrame(init);

            window.addEventListener("resize", function() {
                w = window.innerWidth;
                h = window.innerHeight;
                setCanvasExtents();
            });
        } else {
            console.error("Could not get 2d context from canvas element");
        }
    } else {
        console.error('Could not find canvas element with id "starfield"');
    }

    return () => {
        window.onresize = null;
    };
}, [starColor, backgroundColor, speedFactor, starCount, starSize]);

    return (
        <motion.canvas
            id = "starfield"
            style = {{
                padding: 0,
                margin: 0,
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 10,
                opacity: 1,
                pointerEvents: "none",
                mixBlendMode: "screen",
            }}
        ></motion.canvas>
    )
} 