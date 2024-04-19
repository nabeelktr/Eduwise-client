import React from 'react'
import { ParticipantView, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, type User } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { styles } from '@/styles/style';
import { socketId } from '@/utils/socket';
import { useSelector } from 'react-redux';

const user: User = {
  id:  "Jerec",
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};
const apiKey =  "mmhfdzb5evj2"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSmVyZWMiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0plcmVjIiwiaWF0IjoxNzEzNTAwNTYxLCJleHAiOjE3MTQxMDUzNjZ9.gQcGxThvEJi-Z-Tm5pQPGYAX0SD1zcWrptThRNrMmaY"

const client = new StreamVideoClient({ apiKey, user, token });



type Props = {
    callid: string
}

const Stream = ({callid}: Props) => {
    const call = client.call('livestream', callid);
    call.join({ create: true });
  return (
    <StreamVideo client={client}>
        <StreamCall call={call}>
            <MyLiveStreamUI callid={callid}/>
        </StreamCall>
    </StreamVideo>
  )
}

export const MyLiveStreamUI = ({callid}:any) => {
    const {user} = useSelector((state:any) => state.auth)
    const call = useCall()
    const {useIsCallLive, useLocalParticipant, useParticipantCount} = useCallStateHooks()
    const totalParticipant = useParticipantCount()
    const localParticipant = useLocalParticipant()
    const isCallLive = useIsCallLive()
    const handleStream = () => {
        if(user){
            socketId.emit("startStream", {callid, instructorId: user.id})
        }
    }
    return (
        <div className='flex flex-col gap-[5px] '>
            <div className='flex align-baseline text-white px-4 py-6 rounded-[8px]'>
                Live
            </div>
            <div className=''>
                <div className='flex-1'>
                    {
                        localParticipant && (
                            <ParticipantView participant={localParticipant} ParticipantViewUI={null}/>
                        )
                    }
                </div>
            </div>
            <div className='align-middle flex justify-center items-center'>
                    {
                        isCallLive ? (
                            <button className={`${styles.button}`} onClick={() => call?.stopLive()}> Stop Livestream</button>
                        ): (
                            <button className={`${styles.button}`} onClick={() => {
                                handleStream();
                                call?.goLive()}}> Start Livestream</button>

                        )
                    }
            </div>
        </div>
    )
}

export default Stream

