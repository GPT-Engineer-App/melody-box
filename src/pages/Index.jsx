import React, { useState, useRef } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp } from "react-icons/fa";

const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    audioSrc: "https://example.com/song1.mp3",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzExMDcwMjM3fDA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    audioSrc: "https://example.com/song2.mp3",
    imageSrc: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwYXJ0d29ya3xlbnwwfHx8fDE3MTEwNzAyMzh8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  // Add more tracks here
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  const handleProgressChange = (value) => {
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleAudioTimeUpdate = () => {
    const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progressPercent);
  };

  const playPrevTrack = () => {
    const currentIndex = tracks.findIndex((track) => track.title === currentTrack.title);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  const playNextTrack = () => {
    const currentIndex = tracks.findIndex((track) => track.title === currentTrack.title);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  return (
    <Box maxWidth="400px" mx="auto" p={4}>
      <VStack spacing={6}>
        <Heading as="h1" size="xl">
          Music Player
        </Heading>
        <Image src={currentTrack.imageSrc} alt="Album Cover" borderRadius="md" />
        <Text fontSize="xl" fontWeight="bold">
          {currentTrack.title}
        </Text>
        <Text fontSize="lg" color="gray.500">
          {currentTrack.artist}
        </Text>
        <Flex width="100%" alignItems="center">
          <IconButton icon={<FaBackward />} aria-label="Previous Track" onClick={playPrevTrack} mr={4} />
          <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlayPause} size="lg" />
          <IconButton icon={<FaForward />} aria-label="Next Track" onClick={playNextTrack} ml={4} />
        </Flex>
        <Slider aria-label="Audio Progress" value={progress} onChange={handleProgressChange}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex width="100%" alignItems="center">
          <IconButton icon={<FaVolumeUp />} aria-label="Volume" mr={2} />
          <Slider aria-label="Volume" min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} width="100%">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </VStack>
      <audio ref={audioRef} src={currentTrack.audioSrc} onEnded={handleAudioEnded} onTimeUpdate={handleAudioTimeUpdate} />
    </Box>
  );
};

export default Index;
