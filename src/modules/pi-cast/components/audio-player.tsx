import { useRef, useState } from "react";

type Props = {
  src: string;
};

export const AudioPlayer = ({ src }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioRef = useRef<any>();
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <audio src={src} ref={audioRef} />
      <button onClick={handlePlayPause}>
        {isPlaying ? (
          <div className="rounded-2xl bg-pv-blue-light p-4">
            <img src="/assets/icon/pause.svg" alt="" />
          </div>
        ) : (
          <div className="rounded-2xl bg-pv-blue-light p-4">
            <img src="/assets/icon/play.svg" alt="" />
          </div>
        )}
      </button>
    </>
  );
};
