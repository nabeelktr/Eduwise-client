import React, { useEffect } from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { socketId } from "@/utils/socket";

const user: User = {
  id: "Jerec",
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};
const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSmVyZWMiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0plcmVjIiwiaWF0IjoxNzEzNTAwNTYxLCJleHAiOjE3MTQxMDUzNjZ9.gQcGxThvEJi-Z-Tm5pQPGYAX0SD1zcWrptThRNrMmaY";

const client = new StreamVideoClient({ apiKey, user, token });

type Props = {
  callerid: string;
};

const UserStream = ({ callerid }: Props) => {
  const call = client.call("livestream", callerid);

  call.camera.disable();
  call.microphone.disable();

  call.join({ create: true });

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamLayout showParticipantCount={false} />
      </StreamCall>
    </StreamVideo>
  );
};

export default UserStream;
