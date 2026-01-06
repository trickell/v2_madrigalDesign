import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RobotChaos = () => {
    const [mode, setMode] = useState('intro'); // intro, idle, chaos, exit
    const [showStopBtn, setShowStopBtn] = useState(false);
    const intervalRef = useRef(null);
    const modifiedElements = useRef(new Map()); // Map to store element -> originalCssText

    // Helper to get random integer
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Helper to get random color
    const randomColor = () => {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#FFFFFF', '#000000'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Intro: Robot enters screen automatically
    useEffect(() => {
        const timer = setTimeout(() => {
            setMode('idle');
        }, 2000); // Wait for enter animation
        return () => clearTimeout(timer);
    }, []);

    const startChaos = () => {
        if (mode === 'chaos') return;
        setMode('chaos');
        setShowStopBtn(false);

        // Show stop button after 5 seconds
        setTimeout(() => {
            setShowStopBtn(true);
        }, 5000);

        // Start the chaos interval
        intervalRef.current = setInterval(() => {
            // Exclude our own UI from chaos
            const allElements = document.querySelectorAll('body *:not(.robot-safe):not(.robot-safe *)');
            if (allElements.length === 0) return;

            // Pick a burst of elements to modify
            for (let i = 0; i < 5; i++) {
                const randomEl = allElements[Math.floor(Math.random() * allElements.length)];

                // Ensure we don't pick the container or invalid elements
                if (randomEl && randomEl.style) {
                    // Save original style cssText if not already saved
                    if (!modifiedElements.current.has(randomEl)) {
                        modifiedElements.current.set(randomEl, randomEl.style.cssText);
                    }

                    // Apply chaotic transformations
                    const rotation = randomInt(-180, 180);
                    const x = randomInt(-50, 50);
                    const y = randomInt(-50, 50);
                    const scale = Math.random() * 0.5 + 0.8;

                    // We use inline styles which override CSS classes
                    randomEl.style.transition = 'all 0.5s ease';
                    randomEl.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                    randomEl.style.border = `${randomInt(2, 10)}px solid ${randomColor()}`;

                    if (Math.random() > 0.8) {
                        randomEl.style.backgroundColor = randomColor();
                    }
                }
            }

            // Occasionally mess with the body/background
            const body = document.body;
            if (!modifiedElements.current.has(body)) {
                modifiedElements.current.set(body, body.style.cssText);
            }
            if (Math.random() > 0.95) {
                body.style.transform = `rotate(${randomInt(-5, 5)}deg)`;
                body.style.filter = `hue-rotate(${randomInt(0, 360)}deg)`;
            }

        }, 100);
    };

    const stopChaos = () => {
        setMode('exit');
        setShowStopBtn(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Cleanup: Restore EXACT original cssText
        modifiedElements.current.forEach((originalCss, el) => {
            el.style.cssText = originalCss;
        });
        modifiedElements.current.clear();

        // Restore body specifically if needed (though map should handle it)
        document.body.style.cssText = modifiedElements.current.get(document.body) || "";

        // Reset to intro after exit animation
        setTimeout(() => {
            setMode('intro');
            // Re-trigger intro logic effectively resetting the component visually
            setTimeout(() => {
                setMode('idle');
            }, 2000);
        }, 2000);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            modifiedElements.current.forEach((originalCss, el) => {
                el.style.cssText = originalCss;
            });
        };
    }, []);

    const robotVariants = {
        intro: {
            x: 200,
            y: window.innerHeight - 100,
            rotate: -45,
            opacity: 0,
            scale: 0.5
        },
        idle: {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 100 }
        },
        chaos: {
            x: [0, window.innerWidth - 100, 50, window.innerWidth - 50, 0],
            y: [0, 50, window.innerHeight - 100, 20, window.innerHeight - 50],
            rotate: [0, 360], // Rolling effect
            scale: [1, 1.2, 0.8, 1.1, 1],
            transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear"
            }
        },
        exit: {
            x: -200,
            opacity: 0,
            rotate: -180,
            transition: { duration: 1 }
        }
    };

    return (
        <div className="robot-chaos-container robot-safe" style={{ position: 'fixed', zIndex: 10000, pointerEvents: 'none', bottom: 30, right: 30 }}>

            {/* The Robot Trigger */}
            <AnimatePresence>
                {(mode === 'idle' || mode === 'intro') && (
                    <motion.div
                        className="robot-safe"
                        variants={robotVariants}
                        initial="intro"
                        animate={mode}
                        exit="exit"
                        onClick={startChaos}
                        whileHover={{ scale: 1.2, rotate: 10, cursor: 'pointer' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            fontSize: '4rem',
                            pointerEvents: 'auto',
                            position: 'relative' // relative to container
                        }}
                        title="Click for Chaos!"
                    >
                        🫣
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Chaos Robot (Floating freely) */}
            <AnimatePresence>
                {mode === 'chaos' && (
                    <motion.div
                        className="robot-safe"
                        variants={robotVariants}
                        initial="idle"
                        animate="chaos"
                        exit="exit"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            fontSize: '12rem',
                            pointerEvents: 'none',
                            zIndex: 10002
                        }}
                    >
                        🤪
                        <div style={{ fontSize: '10rem', position: 'absolute', top: 100, left: -20 }}>💪</div>
                        <div style={{ fontSize: '10rem', position: 'absolute', top: 100, left: 140, transform: 'rotateY(180deg)' }}>💪</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stop Button */}
            <AnimatePresence>
                {showStopBtn && (
                    <motion.button
                        className="robot-safe"
                        initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.8 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.8 }}
                        onClick={stopChaos}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            padding: '50px',
                            fontSize: '5rem',
                            fontWeight: 'bold',
                            color: 'white',
                            background: '#ff0000',
                            border: '5px solid #fff',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            pointerEvents: 'auto',
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                            zIndex: 10003,
                            animation: 'pulse 2s infinite'
                        }}
                    >
                        STOP THE CHAOS! 🛑
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RobotChaos;