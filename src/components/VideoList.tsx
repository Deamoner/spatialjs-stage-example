import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Image, Text } from "@react-three/uikit";
import { Card } from "@react-three/uikit-apfel";
import { createWindow } from "@spatialjs/core";
import { IntroVideo } from "./IntroVideo";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const PEXELS_API_KEY =
  "JcYcB3raOOclVb997GFLrVgSlgq22a8m9butlGUpHTaqQAj8KnQ2zemu"; // Replace with your actual Pexels API key

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://api.pexels.com/videos/popular?per_page=15",
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );
        console.log(response.data);
        const fetchedVideos: Video[] = response.data.videos.map(
          (video: any) => ({
            id: video.id,
            title: video.user.name,
            thumbnail: video.image,
            videoUrl:
              video.video_files.find(
                (file: any) => file.quality === "hd" || file.quality === "sd"
              )?.link || "",
          })
        );
        console.log(fetchedVideos);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video: Video) => {
    createWindow(IntroVideo, {
      title: video.title,
      props: {
        stream: video.videoUrl,
      },
    });
  };
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
      {videos.map((video) => (
        <Card
          key={video.id}
          width={175}
          height={175}
          margin={10}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleVideoClick(video)}
        >
          <Container
            gap={10}
            width={175}
            height={175}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={video.thumbnail}
              width={150}
              height={150}
              objectFit="stretch"
            />
          </Container>
          <Text fontSize={24}>{video.title}</Text>
        </Card>
      ))}
    </Container>
  );
};

export default VideoList;
