import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = () => {
    const roles = ["Developer", "Designer", "Photographer", "Glassblower", "Consultant"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'inline-block', minWidth: '250px', textAlign: 'left', marginLeft: '10px' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={roles[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: .8 }}
                    style={{
                        color: 'var(--color-bg-dark)',
                        background: 'var(--color-blue-bright)',
                        padding: '5px 15px',
                        border: '2px solid #20a4e4',
                        boxShadow: '5px 5px 15px #000',
                        fontSize: '150%',
                        color: 'linear-gradient(to top, #000, #fff)',

                    }}
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const IconCard = ({ title, imgDefault, imgActive, link, onClick }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="icopanel"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                flex: 1,
                padding: '30px',
                textAlign: 'center',
                background: hover ? 'var(--color-cyan)' : 'transparent',
                transition: 'background 0.3s',
                borderRadius: '10px',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <img
                src={hover ? imgActive : imgDefault}
                alt={title}
                style={{ width: '150px', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
            />
            <div style={{
                fontFamily: 'var(--font-caviar-bold)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: hover ? '#000' : '#fff',
                textShadow: hover ? 'none' : '2px 2px 4px #000'
            }}>
                {title}
            </div>
        </div>
    );
};

const Hero = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section id="page-top" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '80px', // Navbar offset
            textAlign: 'center'
        }}>

            {/* Logo Fade In */}
            {/* Logo Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                    opacity: { duration: 1 },
                    scale: { duration: 1 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Subtle float
                }}
                whileHover={{
                    scale: 1.1,
                    filter: "drop-shadow(0 0 15px var(--color-cyan))",
                    transition: { duration: 0.3 }
                }}
                style={{ marginBottom: '30px', cursor: 'pointer' }}
            >
                <img src="/img/web_logo_v1.png" alt="Logo" style={{ maxWidth: '300px' }} />
            </motion.div>

            <h1 style={{
                fontFamily: 'var(--font-caviar-bold)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                margin: '20px 0',
                textShadow: '3px 3px 8px #000'
            }}>
                {/* <span style={{
                    position: 'relative',
                    top: '0px',
                    width: '250px',
                    display: 'inline-block',
                    textAlign: 'left',
                    marginLeft: '10px'
                }}>I am a</span>  */}
                <RotatingText />
            </h1>

            {/* Info Box */}
            <div className="frontShadeBox" style={{
                background: 'rgba(0,0,0,0.7)',
                padding: '40px',
                maxWidth: '1200px',
                width: '90%',
                marginTop: '30px',
                borderRadius: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                <p style={{
                    fontSize: '1.4rem',
                    lineHeight: '1.6',
                    marginBottom: '40px',
                    textShadow: '2px 2px 4px #000'
                }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-cyan)' }}>Hello!</span> Welcome to my creative corner!
                    Let's see... development, ui/ux design, photography, glassblowing, and consulting.
                    I'm a jack of several trades, master to few. Read more about me and my work below!
                </p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center'
                }}>
                    <IconCard
                        title="Need a consultation?"
                        imgDefault="/img/consult_ico.png"
                        imgActive="/img/consult_ico_active.png"
                        onClick={() => scrollTo('contact')}
                    />
                    <IconCard
                        title="Learn About Me"
                        imgDefault="/img/about_ico.png"
                        imgActive="/img/about_ico_active.png"
                        onClick={() => scrollTo('about')}
                    />
                    <IconCard
                        title="View Some Creations"
                        imgDefault="/img/gallery_ico.png"
                        imgActive="/img/gallery_ico_active.png"
                        onClick={() => scrollTo('portfolio')}
                    />
                </div>

            </div>

            {/* Mobile Style Override for Hero */}
            <style>{`
                @media (max-width: 768px) {
                    .icopanel { flex: 1 1 100% !important; margin-bottom: 10px; }
                    .frontShadeBox { padding: 20px !important; margin-top: 10px !important; }
                    h1 { font-size: 2rem !important; }
                }
            `}</style>

        </section>
    );
};

export default Hero;
