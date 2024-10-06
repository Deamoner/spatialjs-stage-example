import React, { useMemo, useEffect } from "react";
import { IfInSessionMode, XRLayer } from "@react-three/xr";
import { Container, Video } from "@react-three/uikit";
import { Play, Pause } from "@react-three/uikit-lucide";
import { useRef } from "react";

export function IntroVideo({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<any>(null);
  useEffect(() => {
    console.log("Video element created");
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      console.log("Playing video");
      videoRef.current.element.play();
    }
  }, [videoRef]);

  return (
    <Video
      ref={videoRef}
      scale={1}
      muted
      src={stream}
      autoplay
      width={400}
      height={400}
      crossorigin="anonymous"
    />
  );
}
