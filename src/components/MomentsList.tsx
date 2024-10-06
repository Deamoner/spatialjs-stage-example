import React from "react";
import { Container, Image, Text } from "@react-three/uikit";
import { Card } from "@react-three/uikit-apfel";

interface Moment {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  link?: string;
  videoUrl?: string;
}

interface MomentsListProps {
  moments: Moment[];
}

const MomentsList: React.FC<MomentsListProps> = ({ moments }) => {
  console.log(moments);
  return (
    <Container
      width={900}
      height={600}
      flexDirection="row"
      alignItems="flex-start"
      flexWrap="wrap"
      overflow="scroll"
      gap={10}
    >
      {moments.map((moment) => (
        <>
          <Card
            width={175}
            height={175}
            margin={10}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Container
              key={moment.id}
              gap={10}
              width={175}
              height={175}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={moment.imageUrl}
                width={150}
                height={150}
                objectFit="cover"
              />
            </Container>
            <Text fontSize={24}>{moment.title}</Text>
          </Card>
        </>
      ))}
    </Container>
  );
};

export default MomentsList;
