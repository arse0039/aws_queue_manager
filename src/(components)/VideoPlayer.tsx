import React from 'react';

interface VideoPlayerProps {
  src: string;
  type?: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  type = 'video/mp4',
  width = 540,
  height = 260,
  controls = true,
  autoPlay = true,
  loop = true,
  muted = true,
}) => {
  return (
    <video
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
