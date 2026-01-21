// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import React, { use, useEffect } from 'react'
// import { eq } from 'drizzle-orm';
// import Webcam from "react-webcam";
// import { WebcamIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Interview = ({params}) => {
//     const [interviewDetails, setInterviewDetails] = React.useState(null);
//     const [webcamEnabled, setWebcamEnabled] = React.useState(false);
//  const { interviewId } = React.use(params);
// //    console.log("Interview ID:", interviewId);

//    useEffect(() => {
//     GetInterviewDetails();
//    }, []);

// // console.log(interviewDetails.jobPos);

//   const GetInterviewDetails=async()=>{
//     const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
//     console.log(result);
//     setInterviewDetails(result[0]);
//   }

//   return (
//     <div className='my-10 flex justify-center flex-col items-center'>
//         <h1 className='font-bold text-2xl'>Let's Get Started</h1>
//         <div className='grid grid-cols-1 md:grid-cols-2'>


       
//         <div className='flex flex-col my-5'>
//         <h2 className='text-lg'> <strong>Job Role/Job Position:</strong> {interviewDetails?.jobPos} </h2>
//         <h2 className='text-lg'> <strong>Job Description/Tech Stack:</strong> {interviewDetails?.jobDesc} </h2>
//         <h2 className='text-lg'> <strong>Experience Level:</strong> {interviewDetails?.jobExperience} </h2>
//         </div>
//          <div>
//              </div>

//             {webcamEnabled ?
//             <Webcam 
//             onUserMedia={()=>setWebcamEnabled(true)}
//             onUserMediaError={()=>setWebcamEnabled(false)}
//             mirrored={true}
//             style={
//                 {
//                     height:300,
//                     width:300
//                 }
//             }
            
//             />
//             :
//             <>
//       <WebcamIcon className='h-72 w-full my-5 p-15 bg-secondary rounded-lg border'/>
//       <Button onClick={()=>setWebcamEnabled(true)}>Enable Web Cam and Microphone</Button>
//             </>
//             }
//         </div>
//     </div>
//   )
// }

// export default Interview


"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import { eq } from 'drizzle-orm';
import Webcam from "react-webcam";
import { Link, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';

const Interview = ({ params }) => {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const { interviewId } = React.use(params);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    GetInterviewDetails();
    return () => (document.body.style.overflow = "auto");
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    setInterviewDetails(result[0]);
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex items-center justify-center">

      {/* CENTERED WRAPPER */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-white mb-7">
          Let’s Get Started
        </h1>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">

          {/* LEFT */}
          <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 flex flex-col gap-3 text-white text-sm">

            <h2 className="text-lg font-semibold">
              Interview Details
            </h2>

            <p><b>Role:</b> {interviewDetails?.jobPos}</p>
            <p><b>Tech Stack:</b> {interviewDetails?.jobDesc}</p>
            <p><b>Experience:</b> {interviewDetails?.jobExperience}</p>

            <div className="mt-3 p-3 rounded-lg bg-linear-to-br from-gray-900 to-black border border-white/10 text-xs">
              <p className="font-semibold mb-1 text-yellow-400">
                ⚠ Important Note
              </p>
              <ul className="space-y-0.5 text-gray-300">
                <li>• Video is <b>not recorded</b></li>
                <li>• AI-driven interview</li>
                <li>• Camera & mic required</li>
                <li>• Stable internet needed</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center gap-4">

            {webcamEnabled ? (
              <>
                <Webcam
                  mirrored
                  onUserMedia={() => setWebcamEnabled(true)}
                  onUserMediaError={() => setWebcamEnabled(false)}
                  className="rounded-xl border border-white/10"
                  style={{ width: 260, height: 260 }}
                />
                <NextLink href={`/dashboard/interview/${interviewId}/start`}>
                <Button
                  size="sm"
                  className="px-8 py-4 text-sm bg-white text-black hover:bg-gray-200"
                >
                  Start Interview
                </Button>
                </NextLink>
              </>
            ) : (
              <>
                <div className="h-65 w-65 flex items-center justify-center bg-[#0f0f0f] border border-white/10 rounded-xl">
                  <WebcamIcon className="h-20 w-20 text-gray-500" />
                </div>

                <Button
                  size="sm"
                  className="px-8 py-4 text-sm bg-white text-black hover:bg-gray-200"
                  onClick={() => setWebcamEnabled(true)}
                >
                  Enable Webcam & Microphone
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interview;
