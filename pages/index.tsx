import React, { useState, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import { log } from "console";

interface DataReceive {
  text: string;
  status: string;
  mapsLink: string;
}


const A = () => {
  const [message, setMessage] = useState<DataReceive>();
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [responseData, setResponseData] = useState<any>();

  const addAudioElement = async (blob: Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("audio", blob, "recorded-audio.webm");
      formData.append("latitude", location?.latitude.toString() || "");
      formData.append("longitude", location?.longitude.toString() || "");

      const posting = await axios.post(
        "http://127.0.0.1:5000/api/speech-to-text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);
      setMessage(posting.data);

      try {
        if (posting.data.encoded_text && posting.data.mapsLink) {
          const encodedText = posting.data.encoded_text;
          const mapsLink = encodeURIComponent(posting.data.mapsLink);

          const response = await axios.get(`http://localhost:8000/mitigasi/?msg=${encodedText}&lokasi=${mapsLink}`);

          setResponseData(response)

        }
      } catch (error) {
        console.error(error);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

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
            {
              responseData?.data?.status !== undefined ? (
                responseData.data.status === 'kosong' ? (
                  <div className="w-full flex justify-start">
                    <div className="bg-gray-100 w-fit rounded-lg">
                      <p className="w-52 h-fit p-2 text-black">
                        Mohon maaf laporan anda tidak terkait kebencanaan sehingga kami tidak tindak lanjuti
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-start">
                    <div className="bg-gray-100 w-fit rounded-lg">
                      <p className="w-52 h-fit p-2 text-black">
                        Selamat pelaporan anda telah kami teruskan, mohon untuk menunggu bantuan yang akan datang.
                      </p>
                    </div>
                  </div>
                )
              ) : null
            }

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