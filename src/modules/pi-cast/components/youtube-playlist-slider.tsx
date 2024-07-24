import { memo, useEffect, useState } from "react";
type Props = {
  video: any;
  setCurrentPlay?: () => void;
};

const YoutubePlaylistSlider = ({ video, setCurrentPlay }: Props) => {
  const [videoId, setVideoId] = useState<string>();

  useEffect(() => {
    if (video && video[0]) {
      setVideoId(video[0].snippet.resourceId.videoId);
    }
  }, [video]);

  return (
    <div
      className="mx-4 mb-2 grid cursor-pointer grid-cols-6 gap-4 text-white hover:bg-pv-grey-dark1"
      onClick={() => {
        if (setCurrentPlay) {
          setCurrentPlay();
        }
        setVideoId(videoId);
      }}
    >
      <div className="col-span-2">
        <img
          src={video.snippet.thumbnails.medium.url}
          className="rounded-md"
          alt=""
        />
      </div>
      <div className="col-span-4">
        <div className="pr-10 text-[14px] font-light line-clamp-2">
          {video.snippet.title}
        </div>
        <div className="text-[10px] font-light text-pv-grey-medium1">
          {video.snippet.videoOwnerChannelTitle}
        </div>
      </div>
    </div>
  );
};

export default memo(YoutubePlaylistSlider);
