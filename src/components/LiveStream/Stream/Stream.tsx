import React, { useEffect } from "react";
import {
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { styles } from "../../../styles/style";
import { socketId } from "../../../utils/socket";
import { useSelector } from "react-redux";

const user: User = {
  id: "Plo_Koon",
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};
const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUGxvX0tvb24iLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1Bsb19Lb29uIiwiaWF0IjoxNzE0MTQ0OTM5LCJleHAiOjE3MTQ3NDk3NDR9.vklJatekqtsE5x8B6SdYaQx3oQzAmq-o26lSlEXt1EU";

const client = new StreamVideoClient({ apiKey, user, token });

type Props = {
  callid: string;
};

const Stream = ({ callid }: Props) => {
  const call = client.call("livestream", callid);
  useEffect(() => {
    call.join({ create: true });
    return () => {
      call.endCall();
    };
  }, [callid]);
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyLiveStreamUI callid={callid} />
      </StreamCall>
    </StreamVideo>
  );
};

export const MyLiveStreamUI = ({ callid }: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount } =
    useCallStateHooks();
  const totalParticipant = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();
  const handleStream = () => {
    if (user) {
      socketId.emit("startStream", { callid, instructorId: user.id });
    }
  };
  return (
    <div className="flex flex-col gap-[5px] ">
      <div className="flex rounded-[8px] px-4 py-6 align-baseline text-white">
        Live
      </div>
      <div className="">
        <div className="flex-1">
          {localParticipant && (
            <ParticipantView
              participant={localParticipant}
              ParticipantViewUI={null}
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center align-middle">
        {isCallLive ? (
          <button
            className={`${styles.button}`}
            onClick={() => call?.endCall()}
          >
            {" "}
            Stop Livestream
          </button>
        ) : (
          <button
            className={`${styles.button}`}
            onClick={() => {
              handleStream();
              call?.join();
              call?.goLive();
            }}
          >
            {" "}
            Start Livestream
          </button>
        )}
      </div>
    </div>
  );
};

export default Stream;
