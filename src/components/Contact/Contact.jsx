import React from 'react';
import { BsInstagram, BsYoutube, BsInboxFill, BsLinkedin, BsGithub } from 'react-icons/bs';

const SocialIcon = ({ Icon, label, href }) => {
    const borderColor = (label) => {
        switch (label) {
            case 'Instagram':
                return '#fcb045';
            case 'Youtube':
                return '#fd1d1d';
            case 'Email':
                return '#6200ffff';
            case 'LinkedIn':
                return '#0062ffff';
            case 'Github':
                return '#2b2b2bff';
            default:
                return 'transparent';
        }
    };
    return (
        <li style={{ margin: '15px' }}>
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '1.5rem',
                    color: '#fff',
                    padding: '10px 20px',
                    border: '2px solid transparent',
                    borderRadius: '30px',
                    transition: '0.3s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = borderColor(label);
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.boxShadow = '0 0px 25px ' + borderColor(label);
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <Icon /> {label}
            </a>
        </li>
    );
};

const Contact = () => {
    return (
        <section id="contact" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="header2" style={{
                    fontFamily: 'var(--font-caviar-bold)',
                    fontSize: '3.5rem',
                    marginBottom: '40px',
                    color: 'var(--color-blue-bright)',
                    textShadow: '3px 3px 8px #000'
                }}>
                    Connect with Me
                </h2>

                <ul style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '60px',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '20px',
                    padding: '20px',
                    maxWidth: '900px',
                    margin: '0 auto 60px'
                }}>
                    <SocialIcon Icon={BsInstagram} label="Instagram" href="https://www.instagram.com/trickell/" />
                    <SocialIcon Icon={BsYoutube} label="Youtube" href="https://www.youtube.com/@madtographymd" />
                    <SocialIcon Icon={BsInboxFill} label="Email" href="mailto:wku.madrigal@gmail.com" />
                    <SocialIcon Icon={BsLinkedin} label="LinkedIn" href="https://www.linkedin.com/in/jmadri/" />
                    <SocialIcon Icon={BsGithub} label="Github" href="https://github.com/trickell" />
                </ul>

            </div>

            <footer style={{ background: 'rgba(0,0,0,0.9)', padding: '20px' }}>
                <p style={{ margin: 0, textAlign: 'center', color: '#fff' }}>
                    Copyright &copy; MadrigalDesign {new Date().getFullYear()}
                </p>
            </footer>
        </section>
    );
};

export default Contact;
