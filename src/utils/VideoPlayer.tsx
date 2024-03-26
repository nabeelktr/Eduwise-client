"use client";
import * as React from "react";
import { APITypes, PlyrProps, usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import Hls from "hls.js";
import { Options } from "plyr";

const videoOptions = null;
const videoSource = null;
// const hlsSource =
//   "https://eduwise.s3.ap-south-1.amazonaws.com/media/hls/28a8ca85ad459e616d1cd724bce75307f598da06e5a5b4cb42f3b52210f74f75/28a8ca85ad459e616d1cd724bce75307f598da06e5a5b4cb42f3b52210f74f75_master.m3u8";
// const subtitleTrackUrl =
//   "https://eduwise.s3.ap-south-1.amazonaws.com/media/vtt/28a8ca85ad459e616d1cd724bce75307f598da06e5a5b4cb42f3b52210f74f75.wav.vtt";

const useHls = (src: string, options: Options | null) => {
  const hls = React.useRef<Hls>(new Hls());
  const hasQuality = React.useRef<boolean>(false);
  const [plyrOptions, setPlyrOptions] = React.useState<Options | null>(options);

  React.useEffect(() => {
    hasQuality.current = false;
  }, [options]);

  React.useEffect(() => {
    hls.current.loadSource(src);
    hls.current.attachMedia(document.querySelector(".plyr-react")!);
    hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
      if (hasQuality.current) return;
      const levels = hls.current.levels;
      const quality: Options["quality"] = {
        default: levels[levels.length - 1].height,
        options: levels.map((level) => level.height),
        forced: true,
        onChange: (newQuality: number) => {
          console.log("changes", newQuality);
          levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              hls.current.currentLevel = levelIndex;
            }
          });
        },
      };

      setPlyrOptions({ ...plyrOptions, quality });
      hasQuality.current = true;
    });
  });

  return { options: plyrOptions };
};


const CustomPlyrInstance = React.forwardRef<
  APITypes,
  PlyrProps & { hlsSource: string, subtitleUrl: string }
>((props, ref) => {
  const { source, options = null, hlsSource, subtitleUrl } = props;
  const raptorRef = usePlyr(ref, {
    ...useHls(hlsSource, options),
    source,
  }) as React.MutableRefObject<HTMLVideoElement>;
  console.log(subtitleUrl);
  return (
    <video  crossOrigin="anonymous" ref={raptorRef} className="plyr-react plyr">
      <track
        kind="captions"
        label="English"
        src={subtitleUrl}
        srcLang="en"
        default={true}
      />
    </video>
  );
});
type Props = {
  videoUrl : string;
  subtitleUrl: string;
}
const VideoPlayer:React.FC<Props> = ({videoUrl, subtitleUrl}) => {
  const ref = React.useRef<APITypes>(null);
  const supported = Hls.isSupported();

  return (
    <div className="wrapper">
      {supported ? (
        <CustomPlyrInstance
          ref={ref}
          source={videoSource}
          options={videoOptions}
          hlsSource={videoUrl}
          subtitleUrl={subtitleUrl}
        />
      ) : (
        "HLS is not supported in your browser"
      )}
    </div>
  );
};

export default VideoPlayer;
