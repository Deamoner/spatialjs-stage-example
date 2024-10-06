import React from "react";
import { Container, Text, Image } from "@react-three/uikit";
import { Button } from "@react-three/uikit-apfel";
import { useWindowStore, createWindow } from "@spatialjs/core";
import TvEmulator from "./ArcadeWindow";
import { Gamepad2, SwatchBook, MonitorUp } from "@react-three/uikit-lucide";
import { Tooltip } from "./tooltip";

interface MainMenuProps {
  onStartGame: () => void;
  onOptions: () => void;
  onExit: () => void;
}

const MainMenu: React.FC = () => {
  const tileWindows = useWindowStore((state) => state.tileWindows);
  const removeWindow = useWindowStore((state) => state.removeWindow);
  const focus = useWindowStore((state) => state.focus);
  const unfocus = useWindowStore((state) => state.unfocus);
  const windows = useWindowStore((state) => state.windows);
  return (
    <Container flexDirection="row" justifyContent="center" alignItems="center">
      {Object.entries(windows)
        .filter(([id, window]) => window.id !== "menu")
        .map(([id, window]) => (
          <>
            <Button
              onClick={(e: any) => {
                e.stopPropagation();
                if (window.isFocused) {
                  unfocus(id);
                } else {
                  focus(id);
                }
              }}
              padding={10}
            >
              {!window.disableIcon &&
                window.icon &&
                (typeof window.icon === "object" ? (
                  React.createElement(window.icon, {})
                ) : (
                  <Image
                    src={window.icon as string}
                    width={30}
                    height={30}
                    borderRadius={15}
                    marginRight={10}
                  />
                ))}
            </Button>
          </>
        ))}

      <Button
        onClick={(e: any) => {
          e.stopPropagation();
        }}
        padding={10}
        marginRight={5}
      >
        <MonitorUp />
      </Button>

      <Button
        onClick={(e: any) => {
          e.stopPropagation();
          tileWindows("grid");
        }}
        padding={10}
      >
        <SwatchBook />
      </Button>
    </Container>
  );
};

export default MainMenu;
