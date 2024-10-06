import React, { useState, useEffect } from "react";
import { Container, Text } from "@react-three/uikit";

interface ClockProps {
  disableSeconds?: boolean;
}

const Clock: React.FC<ClockProps> = ({ disableSeconds = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: disableSeconds ? undefined : "2-digit",
    });
  };

  return (
    <Container
      width={300}
      height={100}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={45}>{formatTime(time)}</Text>
    </Container>
  );
};

export default Clock;
