import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import PushableButton from '../UI/PushableButton';

const baseProjects = [
    {
        id: 'fconnect',
        title: 'FestConnection',
        color: 'blue',
        thumb: '/img/projects/festconnection_thumb.png',
        link: 'http://www.festconnection.com',
        tools: ['Laravel 10.0', 'Bootstrap 4.0', 'HTML5 / CSS', 'Javascript / jQuery', 'MySQL / Eloquent'],
        description: `FestConnection is a festival and event user driven website where users can reconnect with their lost and missed connections from previous festivals.`,
        description2: `Why create/use another facebook group? Keep your connections and memories alive with FestConnection.`,
        repo: 'https://github.com/trickell/festconnect'
    },
    {
        id: 'creatti',
        title: 'Creatticon',
        color: 'orange',
        thumb: '/img/projects/creatticon_thumb.png',
        link: 'https://www.madrigal.design/create/',
        tools: ['Bootstrap 4.0', 'HTML5 / CSS', 'Javascript / jQuery'],
        description: `Creatticon is a conference bringing together artists, musicians, and vendors.`,
        description2: `Built with unique design and interactive javascript driven pages.`,
        repo: null
    },
    {
        id: 'miccart',
        title: 'Microcart',
        color: 'green',
        thumb: '/img/projects/Microcart_thumb.png',
        link: '#',
        tools: ['NextJS', 'React.js', 'HTML5 / CSS', 'PostgreSQL / Sequelize'],
        description: `Microcart is a microservice driven e-commerce platform allowing users to create their own store.`,
        description2: `Currently in development (Planned 2026).`,
        repo: 'https://github.com/trickell/microcart/tree/dev'
    },
    {
        id: 'photography',
        title: 'MadTography',
        color: 'cyan',
        thumb: '/img/projects/madtography_thumb.png',
        link: 'https://madtography.com',
        tools: ['HTML5 / CSS', 'Javascript / jQuery'],
        description: `MadTography is a photography portfolio website for showcasing my photography work.`,
        description2: `It showcases not only my photography, but also my frontend development skills.`,
        repo: null
    },
    {
        id: 'chromaPortalFx',
        title: 'Chroma Portal FX',
        color: 'gray',
        thumb: '/img/projects/portalfx_thumb.png',
        link: 'https://chromaportalfx.com',
        tools: ['HTML5 / CSS', 'Javascript / jQuery'],
        description: `Chroma Portal FX is an interactive and immersive art installation experience.`,
        description2: `I'm also into LED Art installations and have been working on a few projects in that area. This brings to life those projects and allows for booking those installations at events.`,
        repo: null
    }
];

// For now, Creations renders the same data as Projects as requested, but separated logic
const baseCreations = [
    {
        id: 'creation1',
        title: 'Halloween CSS Competition',
        color: 'orange',
        thumb: '/img/projects/c_HalloweenContest.png', // Placeholder
        link: 'https://codepen.io/trickell-trickell/pen/NPxMboq',
        tools: ['CSS', 'HTML5'],
        description: `A Halloween themed CSS competition entry.`,
        description2: `Did this for the 2025 Halloween CSS competition for DEV.to. There's a codepen link to view the entry.`,
        repo: null
    },
    {
        id: 'creation2',
        title: 'Links Site Background',
        color: 'yellow',
        thumb: '/img/projects/c_mandala.png', // Placeholder
        link: 'https://www.shadertoy.com/view/WfSXzz',
        tools: ['GLSL', 'HTML5 / CSS'],
        description: `A mandala inspired background for the Links site using GLSL shaders.`,
        description2: `This was a fun experiment using GLSL shaders to create a mandala inspired background for the Links site.`,
        repo: null
    },
    {
        id: 'creation3',
        title: 'Badge Generator',
        color: 'green',
        thumb: '/img/projects/c_badgeGenerate.png', // Placeholder
        link: 'https://legendary-goldfish-vpxw556vqrcpv5x-3000.app.github.dev/',
        tools: ['Node.js', 'HTML5 / CSS', 'Javascript / jQuery'],
        description: `A badge generator for github and DEV.to profiles.`,
        description2: `Experimenting with creating a badge generator for small LCD displays for Raspberry Pi projects. Still in it's beginning phase.`,
        repo: 'https://github.com/trickell/node-badge-creator'
    }
];

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('projects'); // Default to projects or creations
    const [showInfo, setShowInfo] = useState(false);

    // Determine which dataset to use
    const sourceData = activeTab === 'projects' ? baseProjects : baseCreations;

    // Duplicate projects to ensure we have enough for the carousel effect (min 5 needed for good look)
    // We memoize this to prevent recalculation on every render unless tab changes
    const carouselItems = React.useMemo(() => {
        return [...sourceData, ...sourceData, ...sourceData].map((p, i) => ({ ...p, uniqueId: `${p.id}-${i}` }));
    }, [sourceData]);

    const [activeIndex, setActiveIndex] = useState(Math.floor(carouselItems.length / 2));

    // Reset index when tab changes to ensure we start in the middle of the new list
    React.useEffect(() => {
        setActiveIndex(Math.floor(carouselItems.length / 2));
        setShowInfo(false);
    }, [activeTab, carouselItems.length]);

    const paginate = (newDirection) => {
        setActiveIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = carouselItems.length - 1;
            if (next >= carouselItems.length) next = 0;
            return next;
        });
        setShowInfo(false);
    };

    // Helper to determine styles based on distance from active
    const getCardStyle = (index) => {
        let diff = index - activeIndex;

        // Infinite Wrap Logic
        if (diff > carouselItems.length / 2) diff -= carouselItems.length;
        if (diff < -carouselItems.length / 2) diff += carouselItems.length;

        const absDiff = Math.abs(diff);

        // Don't render items too far away to save performance, but keep enough for wide screens
        if (absDiff > 3) return { display: 'none' };

        // Responsive Spacing
        const isMobile = window.innerWidth < 768;
        const width = 350;
        const spacing = isMobile ? 360 : 400; // Space between card centers

        // X Position: Simple linear placement
        const xOffset = diff * spacing;

        // No fading, no scaling (all equal size)
        const scale = 1;
        // Inactive items get 0.75 opacity
        const opacity = diff === 0 ? 1 : 0.75;
        const zIndex = 10 - absDiff; // Just to ensure overlap layering is clean if tighter

        // Simple shadow for non-active
        const boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

        return {
            zIndex,
            scale,
            opacity,
            x: xOffset,
            boxShadow,
            display: 'block'
        };
    };

    const tabStyle = (tabName) => ({
        cursor: 'pointer',
        transition: '0.3s',
        filter: activeTab === tabName ? 'blur(0px)' : 'blur(2px)',
        opacity: activeTab === tabName ? 1 : 0.5,
        // scale: activeTab === tabName ? 1.1 : 1
    });

    return (
        <section id="portfolio" style={{ padding: '100px 0', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

            {/* Header Tabs */}
            <h1 className="header2" style={{ textAlign: 'center', marginBottom: '80px', color: 'var(--color-text-main)', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <span
                    onClick={() => setActiveTab('creations')}
                    style={tabStyle('creations')}
                    className="portfolio-tab"
                >
                    Creations
                </span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span
                    onClick={() => setActiveTab('projects')}
                    style={tabStyle('projects')}
                    className="portfolio-tab"
                >
                    Projects
                </span>
            </h1>

            {/* Carousel Container */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                {/* Carousel Items Area */}
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatePresence>
                        {carouselItems.map((proj, index) => {
                            const style = getCardStyle(index);
                            if (style.display === 'none') return null;

                            const isCenter = index === activeIndex;

                            return (
                                <motion.div
                                    key={proj.uniqueId}
                                    className={isCenter ? "carousel-card active-glow-card" : "carousel-card"} // Add Glow Class
                                    initial={false}
                                    animate={{
                                        x: style.x,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        boxShadow: isCenter ? '0 0 20px 10px #fff,  0 0 600px 20px #f0f, 0 0 90px 30px #0ff' : style.boxShadow // Will be overridden by CSS for active
                                    }}
                                    transition={{ duration: 0.5, ease: "backOut" }} // backOut for snappy feel
                                    style={{
                                        position: 'absolute',
                                        width: '350px',
                                        height: '500px', // Fixed height for equal boxes
                                        background: '#0b2631', // Darker Blue from palette theme
                                        borderRadius: '20px',
                                        padding: '20px',
                                        cursor: isCenter ? 'default' : 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                    onClick={() => {
                                        if (!isCenter) setActiveIndex(index);
                                    }}
                                >
                                    {/* Active Card Content / Thumbnail Logic */}
                                    {!isCenter || !showInfo ? (
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            pointerEvents: isCenter ? 'auto' : 'none',
                                            textAlign: 'center'
                                        }}>
                                            <h3 style={{
                                                fontFamily: 'var(--font-caviar-bold)',
                                                marginBottom: '20px',
                                                fontSize: '2rem',
                                                color: proj.color
                                            }}>
                                                {proj.title}
                                            </h3>
                                            <div style={{
                                                flex: 1,
                                                width: '100%',
                                                overflow: 'hidden',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: '#000'
                                            }}>
                                                <img
                                                    src={proj.thumb}
                                                    alt={proj.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>

                                            {isCenter && (
                                                <div style={{ marginTop: '25px', marginBottom: '10px' }}>
                                                    <PushableButton
                                                        onClick={(e) => { e.stopPropagation(); setShowInfo(true); }}
                                                        frontStyle={{
                                                            background: 'linear-gradient(to bottom, #8a1fad 5%, #67097a 100%)',
                                                            fontSize: '1.2rem',
                                                            padding: '10px 30px'
                                                        }}
                                                    >
                                                        More Info
                                                    </PushableButton>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Info View
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            textAlign: 'left',
                                            color: '#fff',
                                            overflowY: 'auto' // Handle overflow
                                        }}>
                                            <div style={{ marginBottom: '15px', borderBottom: '1px solid #444', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-cyan)' }}>{proj.title}</h4>
                                                <PushableButton
                                                    onClick={(e) => { e.stopPropagation(); setShowInfo(false); }}
                                                    frontStyle={{ padding: '5px 15px', fontSize: '0.8rem', background: '#444' }}
                                                >
                                                    X
                                                </PushableButton>
                                            </div>

                                            <div style={{ marginBottom: '20px' }}>
                                                <strong>Stack:</strong>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                                                    {proj.tools.map(t => (
                                                        <span key={t} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{t}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '15px', flex: 1 }}>
                                                {proj.description}
                                                <br /><br />
                                                {proj.description2}
                                            </p>
                                            <div style={{ display: 'flex', gap: '15px', fontSize: '1rem', marginTop: 'auto', alignItems: 'center' }}>
                                                {proj.link && proj.link !== '#' && (
                                                    <a href={proj.link} target="_blank" style={{ textDecoration: 'none' }}>
                                                        <PushableButton frontStyle={{ background: 'var(--color-cyan)', color: '#000', fontWeight: 'bold' }}>
                                                            Visit Site
                                                        </PushableButton>
                                                    </a>
                                                )}
                                                {proj.repo && <a href={proj.repo} target="_blank" style={{ color: '#fff', textDecoration: 'underline' }}>Source Code</a>}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Navigation Arrows - Moved Below */}
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    marginTop: '40px',
                    zIndex: 20
                }}>
                    <PushableButton
                        onClick={() => paginate(-1)}
                        style={{ width: '80px', fontSize: '1.5rem' }}
                        frontStyle={{
                            padding: '15px 0',
                            background: 'linear-gradient(135deg, #00f0e8, #004e7a)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            color: '#002e33'
                        }}
                    >
                        <BsChevronLeft />
                    </PushableButton>

                    <PushableButton
                        onClick={() => paginate(1)}
                        style={{ width: '80px', fontSize: '1.5rem' }}
                        frontStyle={{
                            padding: '15px 0',
                            background: 'linear-gradient(135deg, #00f0e8, #004e7a)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            color: '#002e33'
                        }}
                    >
                        <BsChevronRight />
                    </PushableButton>
                </div>

            </div>
        </section>
    );
};

export default Portfolio;
