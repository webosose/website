import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { fetchVideoUrl } from "../../ServiceFunction/ServiceToTypeScript";

function MediaPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const fetchVideoPath = async () => {
        try {
            const url = await fetchVideoUrl(); // Call the asynchronous function
            setVideoUrl(url);
        } catch (err) {
            setError("Failed to load video URL.");
        }
    };
       
    useEffect(() => {
        fetchVideoPath(); // Fetch the file path when the component mounts
    }, []);

    return (
        <div className="noglobal">
            <div className="video-player">
                {error ? (
                    <p>Error: {error}</p> // Display the error message
                ) : videoUrl ? (
                    <ReactPlayer
                        url={videoUrl}
                        playing
                        loop={false}
                        muted
                        className="react-player"
                        controls
                        width="100%"
                        height="100%"
                        style={{
                            maxWidth: "400px", // Limit the maximum width
                            aspectRatio: "16 / 9", // Maintain 16:9 aspect ratio
                            margin: "auto", // Center alignment
                        }}
                        onEnded={fetchVideoPath}
                    />
                ) : (
                    <p>Loading video...</p> // Display a loading message
                )}
            </div>
        </div>
    );
}

export default MediaPlayer;
