import '../Player/Player.css';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';


export const Player = (props) => {

    const videoUrl = `/video/${props.fileName}`;
    console.log(videoUrl);
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState();

    function handlePlay() {
        console.log(props.fileName);
        setIsPlaying(true);
        if (videoRef.current) {
            console.log('play');
            videoRef.current.play();
        }
    }

    function handlePause() {
        setIsPlaying(false);
        if (videoRef.current) {
            console.log('pause');
            videoRef.current.pause();
        }
    }

    return (
        <>
            <h1>Test Player</h1>
            <div className='video-container'>
                <video key={props.fileUrl} ref={videoRef} id="video-player" preload="metadata" data-aos="fade-up" autoPlay width="480" height="auto">
                    <source src={props.fileUrl} type="video/mp4" />
                    {/* need to convert mov to mp4 */}
                    <source src={props.fileUrl} type="video/quicktime" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {isPlaying ?
                <button onClick={() => handlePause()} className='icon' ><FontAwesomeIcon icon={faPause} className='icon-pause' /></button>
                :
                <button onClick={() => handlePlay()} className='icon'><FontAwesomeIcon icon={faPlay} className='icon-play' /></button>
            }
        </>
    );
};
