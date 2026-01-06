import React from 'react';
import PushableButton from '../UI/PushableButton';

const About = () => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const [repos, setRepos] = React.useState([]);

    React.useEffect(() => {
        if (isFlipped && repos.length === 0) {
            const fetchRepos = async () => {
                try {
                    const response = await fetch('https://api.github.com/users/trickell/repos');
                    const data = await response.json();
                    setRepos(data);
                } catch (error) {
                    console.error("Error fetching repos:", error);
                }
            };
            fetchRepos();
        }
    }, [isFlipped, repos.length]);

    return (
        <section id="about" style={{ padding: '100px 0' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    color: '#fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src="/img/about_headshot.jpg"
                            alt="John Madrigal"
                            style={{ width: '350px', height: '350px', objectFit: 'cover', borderRadius: '50%' }} /><br />

                        <h2 className="header2" style={{
                            background: '#000',
                            padding: '10px 20px',
                            display: 'inline-block',
                            marginBottom: '30px',
                            color: 'var(--color-blue-bright)',
                            fontFamily: 'var(--font-caviar-bold)',
                            fontSize: '3rem'
                        }}>
                            Enter My Mind
                        </h2>
                    </div>
                    {isFlipped ? (
                        <div className="about-back" style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
                            <div style={{ marginBottom: '20px', maxHeight: '600px', overflowY: 'auto' }}>
                                {repos.map(repo => (
                                    <div key={repo.id} style={{ marginBottom: '10px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
                                        <p style={{ margin: 0, fontWeight: 'bold' }}>{repo.name}</p>
                                        {repo.description && <p style={{ fontSize: '0.9rem', margin: '5px 0 0 0' }}>{repo.description}</p>}
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-bright)', fontSize: '1rem' }}>View Code</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="about-front" style={{ fontSize: '1.3rem', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '20px' }}>
                                Hey! Hi! Hai! Hola! Konnichiwa! 👋 <br />
                                I'm <b>John Madrigal</b> — a curious mind that never sticks to just one lane.
                                I bounce between tech and creativity, and honestly, that's where I do my
                                best work.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                I've rediscovered my love for coding, and I'm only going deeper from here.
                                At the same time, I'll always be drawn to creating—whether that's capturing
                                a perfectly timed photo, syncing video to audio just right, or crafting
                                something beautiful through glassblowing. Think of me as your <b>tech
                                    + creative</b> problem-solver.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                I'm also a lifelong gamer (Steam tag: <b>trickell</b>). Gaming has been
                                part of my world forever, and it's sharpened my reaction time, critical
                                thinking, and problem-solving skills more than most people realize.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                I may not claim to be the best with words—but hand me a puzzle, a challenge,
                                or an idea to build, and I'll find a creative, effective solution. So… are we friends yet? 🤝
                            </p>
                            <p style={{ marginBottom: '30px' }}>
                                Let's explore bold ideas, question the impossible, and have the confidence to say, <i>"Yeah, that's doable."</i>
                                If you want the technical and professional details, check out my <b>résumé</b> and <b>github repositories</b> below.
                            </p>
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <PushableButton
                            onClick={(e) => { e.stopPropagation(); window.open('/Resume 2024 Web Application Programmer.pdf', '_blank'); }}
                            frontStyle={{
                                background: 'linear-gradient(to bottom, #8a1fad 5%, #67097a 100%)',
                                fontSize: '1.2rem',
                                padding: '10px 30px'
                            }}
                        >
                            View Resume
                        </PushableButton>
                        &nbsp;&nbsp;&nbsp;
                        <PushableButton
                            onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                            style={{ margin: '10px' }}
                            frontStyle={{
                                background: 'linear-gradient(to bottom, #8a1fad 5%, #67097a 100%)',
                                fontSize: '1.2rem',
                                padding: '10px 30px'
                            }}
                        >
                            {isFlipped ? "View About" : "View Repositories"}
                        </PushableButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
