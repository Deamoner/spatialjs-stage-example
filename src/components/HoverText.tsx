import React, { useState } from "react";
import { Container, Root, Text } from "@react-three/uikit";
import { Vector3 } from "three";
import { createWindow } from "@spatialjs/core";

interface HoverTextProps {
  text: string;
  position: Vector3;
}

const HoverText: React.FC<HoverTextProps> = ({ text, position }) => {
  return (
    <Container>
      <Text fontSize={8}>{text}</Text>
    </Container>
  );
};

// export const onHoverText = (e: any) => {
//   e.stopPropagation();
//               console.log(e);
//               createWindow(HoverText, {
//                 id: "hover",
//                 props: {
//       text: window.title,
//       position: [0, 0, 0],
//     },
//   });
// };

export default HoverText;
