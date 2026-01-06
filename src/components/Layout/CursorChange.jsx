import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorChange = () => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const divsToRender = Array(60).fill();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="customCursor"
                style={{
                    position: 'absolute',
                    left: mouse.x,
                    top: mouse.y,
                }}
            >
                {divsToRender.map((_, index) => (
                    index != 0 ? (
                        <div
                            key={index}
                            style={{
                                left: mouse.x + .1 + index * 15,
                                top: mouse.y + .1 + index * 15,
                                animationDelay: `${index * 0.2}s`,
                                // filter: `blur(${index * 1.1}px)`,
                                pointerEvents: 'none',
                            }}
                        ></div>
                    ) : (
                        <div
                            key={index}
                            style={{
                                left: mouse.x + .02,
                                top: mouse.y,
                                animationDelay: `${index * 0.2}s`,
                                pointerEvents: 'none',
                            }}
                        ></div>
                    )
                ))}
            </motion.div>
        </AnimatePresence>
    );
};

export default CursorChange;
