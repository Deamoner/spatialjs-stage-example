import React, { useEffect, useRef, useState } from "react";
import { Root, Container, Text } from "@react-three/uikit";

interface ConsoleProps {
  maxLines?: number;
}

export const Console: React.FC<ConsoleProps> = ({ maxLines = 100 }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    const originalConsole = { ...console };
    const methods = ["log", "info", "warn", "error"];

    methods.forEach((method) => {
      console[method as keyof typeof console] = (...args: any[]) => {
        originalConsole[method as keyof typeof console](...args);
        const message = args
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
          .join(" ");

        setLogs((prevLogs) => {
          if (
            `[${method.toUpperCase()}] ${message}` !==
            prevLogs[prevLogs.length - 1]
          ) {
            const newLogs = [
              ...prevLogs,
              `[${method.toUpperCase()}] ${message}`,
            ];
            return newLogs.slice(-maxLines);
          }
          return prevLogs;
        });
      };
    });

    return () => {
      methods.forEach((method) => {
        console[method as keyof typeof console] =
          originalConsole[method as keyof typeof console];
      });
    };
  }, [maxLines]);

  useEffect(() => {
    // if (scrollViewRef.current) {
    //   scrollViewRef.current.scrollTo(0, Number.MAX_SAFE_INTEGER);
    // }
  }, [logs]);

  return (
    <Container
      ref={scrollViewRef}
      width={300}
      height={200}
      padding={10}
      overflow="scroll"
      alignItems="flex-start"
      flexWrap="wrap"
      backgroundColor="black"
    >
      {logs.map((log, index) => (
        <Text
          key={index}
          fontSize={10}
          fontWeight="medium"
          color="white"
          width={300}
          flexWrap="wrap"
          multiLine
        >
          {log}
        </Text>
      ))}
    </Container>
  );
};
