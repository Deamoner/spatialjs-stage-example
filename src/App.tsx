import React, { Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { WindowManager, createWindow } from "@spatialjs/core";
import { PointerLockControls } from "@react-three/drei";
import {
  IfInSessionMode,
  XR,
  createXRStore,
  TeleportTarget,
  useXRInputSourceState,
  XROrigin,
} from "@react-three/xr";
import * as THREE from "three";
import MainMenu from "./components/MainMenu";
import Clock from "./components/Clock";
import Pomondoro from "./components/Pomondoro";
import {
  Gamepad2,
  Watch,
  Clock1,
  Terminal,
  Clapperboard,
  Drama,
} from "@react-three/uikit-lucide";
import { IntroVideo } from "./components/IntroVideo";
import { Stage } from "./components/Stage";
import { Teleporter } from "./components/Teleporter";
import { Console } from "./components/Console";
import { useRef } from "react";
import VideoList from "./components/VideoList";

const store = createXRStore({
  emulate: true,
  frameRate: "high",
  foveation: 0,
  boundless: true,
});

const App: React.FC = () => {
  console.log("App component rendered");
  //useWindowStore.setState({ debug: true });
  useEffect(() => {
    createWindow(IntroVideo, {
      id: "intro-video",
      title: "Intro",
      props: {
        stream: "./Intro.mp4",
      },
      followCamera: false,
      disableBackground: false,
      disableTiling: true,
      icon: Clapperboard,
      position: new THREE.Vector3(
        -6.515547180175781,
        4.948447640633346,
        0.5299375558790193
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
    createWindow(MainMenu, {
      id: "menu",
      title: "Main Menu",
      followCamera: true,
      disableBackground: false,
      disableTitleBar: true,
      disableTiling: true,
      position: new THREE.Vector3(
        -6.31554718017578,
        0.7298358951552244,
        0.49989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
    createWindow(Clock, {
      id: "clock",
      title: "Clock",
      followCamera: true,
      disableBackground: false,
      disableTitleBar: true,
      disableTiling: true,
      selectable: false,
      icon: Clock1,
      position: new THREE.Vector3(
        -6.31554718017578,
        2.0298358951552244,
        0.49989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
    createWindow(Pomondoro, {
      id: "pomo",
      title: "Pomondoro",
      followCamera: true,
      disableTiling: true,
      disableTitleBar: true,
      selectable: false,
      icon: Watch,
      position: new THREE.Vector3(
        -6.31554718017578,
        2.0298358951552244,
        -2.49989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });

    createWindow(Console, {
      id: "console",
      title: "Console",
      followCamera: true,
      disableTiling: true,
      icon: Terminal,
      position: new THREE.Vector3(
        -6.31554718017578,
        3.0298358951552244,
        3.59989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI / 2, 0),
    });
    createWindow(VideoList, {
      id: "video-list",
      title: "Video List",
      props: {
        moments: generateRandomMoments(50),
      },
      followCamera: false,
      disableTiling: true,
      icon: Drama,
      position: new THREE.Vector3(
        -2.31554718017578,
        4.0298358951552244,
        6.59989919107340003
      ),
      rotation: new THREE.Euler(0, Math.PI, 0),
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        gl={{ localClippingEnabled: true }}
        camera={{
          position: [-2, 3.9354946965225684, 1.33710176014615864],
          rotation: new THREE.Euler(
            -0.1098708913525798,
            0.8603464464780124,
            0.038877349543585876
          ),
        }}
      >
        <XR store={store}>
          <IfInSessionMode deny="immersive-ar">
            <PointerLockControls />
          </IfInSessionMode>
          <Suspense fallback={null}>{/*   */}</Suspense>
          <Suspense fallback={null}>
            <WindowManager key="window-manager" />
          </Suspense>

          <Suspense fallback={null}>
            <TeleportTarget>
              <Stage position={[-2, -4, 12]} scale={2} />
            </TeleportTarget>

            <Locomotion />
            <Teleporter position={[-2, -4, 3]} scale={1.5} />
          </Suspense>
          <directionalLight position={[5, 4, 5]} intensity={0.5} castShadow />
          <directionalLight position={[-5, 4, -5]} intensity={0.5} castShadow />
        </XR>
      </Canvas>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={() => store.enterAR()}>Enter AR</button>
      </div>
    </div>
  );
};

function Locomotion() {
  const controller = useXRInputSourceState("controller", "right");
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current == null || controller == null) {
      return;
    }
    const thumstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumstickState == null) {
      return;
    }
    ref.current.position.x += (thumstickState.xAxis ?? 0) * delta * 1.5;
    ref.current.position.z += (thumstickState.yAxis ?? 0) * delta * 1.5;
  });
  return <XROrigin ref={ref} />;
}

const generateRandomMoments = (count: number) => {
  const moments = [];
  for (let i = 1; i <= count; i++) {
    moments.push({
      id: i.toString(),
      title: `Moment ${i}`,
      imageUrl: Math.random() < 0.5 ? "main.png" : "Room.PNG",
    });
  }
  return moments;
};

export default React.memo(App);
