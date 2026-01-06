import React from 'react';

const VideoBackground = () => {
    return (
        <div id="video-bg" style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: 'hidden',
            zIndex: -100,
        }}>
            <video
                className="home_video"
                loop
                muted
                autoPlay
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    transform: 'translateX(-50%) translateY(-50%)',
                    objectFit: 'cover'
                }}
            >
                <source src="/img/vids/background1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Overlay to ensure text readability if needed */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.1)'
            }}></div>
        </div>
    );
};

export default VideoBackground;
