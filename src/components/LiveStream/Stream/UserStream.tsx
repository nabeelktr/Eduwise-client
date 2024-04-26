import React from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  type User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

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
