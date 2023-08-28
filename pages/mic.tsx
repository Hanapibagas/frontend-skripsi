// import React, { useState } from "react";
// import { AudioRecorder } from "react-audio-voice-recorder";
// import axios from "axios";

// interface DataReceive {
//   text: string;
//   status: string;
// }

// const A = () => {
//   const [message, setMessage] = useState<DataReceive>();
//   const addAudioElement = async (blob: Blob) => {
//     try {
//       console.log("HAI RECORD");
//       const formData = new FormData();
//       formData.append("audio", blob, "recorded-audio.webm");
//       const posting = await axios.post(
//         "http://127.0.0.1:5000/api/speech-to-text",
//         formData,
//         {
//           method: "POST",
//           headers: {},
//         }
//       );
//       setMessage(posting.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-200 ">
//       <div className="md:max-w-1xl h-full lg:max-w-2xl duration-500 xl:max-w-xl w-full flex flex-col items-stretch grow flex-shrink-0 gap-x-4 md:p-2 py-2">
//         <div className="bg-white w-full rounded-xl border border-gray-300 flex flex-col h-full items-center justify-between">
//           <div className="h-32 flex justify-center items-center">
//             <p className="text-xl  font-bold text-black">Aplikasi Pelaporan</p>
//           </div>
//           <div className="w-full p-8 space-y-2 h-full">
//             <div className="w-full flex justify-start">
//               <div className="bg-gray-100 w-fit rounded-lg ">
//                 <p className="w-44 h-fit p-2 text-black">{"Selamat datang"}</p>
//               </div>
//             </div>
//             <div className="w-full flex justify-start">
//               <div className="bg-gray-100 w-fit rounded-lg ">
//                 <p className="w-44 h-fit p-2 text-black">
//                   {"Silahkan melapor"}
//                 </p>
//               </div>
//             </div>
//             {message?.text && message?.text.length > 0 ? (
//               <div className="w-full flex justify-end">
//                 <div className="bg-teal-500 w-fit rounded-lg ">
//                   <p className="w-52 h-fit p-2 text-white ">
//                     {message?.text + "."}
//                   </p>
//                 </div>
//               </div>
//             ) : null}
//             {message?.text && message?.text.length > 0 ? (
//               <div className="w-full flex justify-start">
//                 <div className="bg-gray-100 w-fit rounded-lg ">
//                   <p className="w-52 h-fit p-2 text-black">{`Terima kasih isi laporan Anda adalah ${message.status}.`}</p>
//                 </div>
//               </div>
//             ) : null}
//           </div>
//           <div className="h-44">
//             <AudioRecorder
//               classes={{
//                 AudioRecorderClass: "bg-white",
//                 AudioRecorderDiscardClass: "bg-white",
//                 AudioRecorderPauseResumeClass: "bg-white",
//                 AudioRecorderStartSaveClass: "bg-teal-500",
//                 AudioRecorderStatusClass: "bg-white",
//                 AudioRecorderTimerClass: "bg-white",
//               }}
//               onRecordingComplete={addAudioElement}
//               audioTrackConstraints={{
//                 noiseSuppression: true,
//                 echoCancellation: true,
//               }}
//               showVisualizer={true}
//               downloadFileExtension="webm"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default A;

import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

interface DataReceive {
  text: string;
  status: string;
}

const A = () => {
  const [message, setMessage] = useState<DataReceive>();
  const [loading, setLoading] = useState<boolean>(false);
  const addAudioElement = async (blob: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("audio", blob, "recorded-audio.webm");
      const posting = await axios.post(
        "http://127.0.0.1:5000/api/speech-to-text",
        formData,
        {
          method: "POST",
          headers: {},
        }
      );
      Promise.all([setLoading(false), setMessage(posting.data)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 ">
      <div className="md:max-w-1xl h-full lg:max-w-2xl duration-500 xl:max-w-xl w-full flex flex-col items-stretch grow flex-shrink-0 gap-x-4 md:p-2 py-2">
        <div className="bg-white w-full rounded-xl border border-gray-300 flex flex-col h-full items-center justify-between">
          <div className="h-32 flex justify-center items-center">
            <p className="text-xl  font-bold text-black">Aplikasi Pelaporan</p>
          </div>
          <div className="w-full p-8 space-y-2 h-full">
            <div className="w-full flex justify-start">
              <div className="bg-gray-100 w-fit rounded-lg ">
                <p className="w-44 h-fit p-2 text-black">{"Selamat datang"}</p>
              </div>
            </div>
            <div className="w-full flex justify-start">
              <div className="bg-gray-100 w-fit rounded-lg ">
                <p className="w-44 h-fit p-2 text-black">
                  {"Silahkan melapor"}
                </p>
              </div>
            </div>
            {message?.text && message?.text.length > 0 ? (
              <div className="w-full flex justify-end">
                <div className="bg-teal-500 w-fit rounded-lg ">
                  <p className="w-52 h-fit p-2 text-white ">
                    {message?.text + "."}
                  </p>
                </div>
              </div>
            ) : null}
            {message?.text && message?.text.length > 0 ? (
              <div className="w-full flex justify-start">
                <div className="bg-gray-100 w-fit rounded-lg ">
                  <p className="w-52 h-fit p-2 text-black">{`${message.status}`}</p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="h-44">
            {loading ? (
              <div className="w-10 h-10 rounded-full border-r-2 animate-spin border-teal-500" />
            ) : (
              <AudioRecorder
                classes={{
                  AudioRecorderClass: "bg-white",
                  AudioRecorderDiscardClass: "bg-white",
                  AudioRecorderPauseResumeClass: "bg-white",
                  AudioRecorderStartSaveClass: "bg-teal-500",
                  AudioRecorderStatusClass: "bg-white",
                  AudioRecorderTimerClass: "bg-white",
                }}
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                showVisualizer={true}
                downloadFileExtension="webm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default A;