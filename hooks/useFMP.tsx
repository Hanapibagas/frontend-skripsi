import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

// Function to convert WebM to MP3
const convertWebMToMP3 = async (webmData: any) => {
  // Load the ffmpeg.wasm library
  await ffmpeg.load();

  // Write the WebM data to the virtual file system
  ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmData));

  // Run the conversion command
  await ffmpeg.run("-i", "input.webm", "output.mp3");

  // Read the converted file from the virtual file system
  const mp3Data = ffmpeg.FS("readFile", "output.mp3");

  // Return the converted MP3 data as a Blob
  return new Blob([mp3Data.buffer], { type: "audio/mpeg" });
};

export default convertWebMToMP3;
