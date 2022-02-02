import React from "react";
import Link from "next/link";
import { Text, Box, Flex } from "rebass/styled-components";
import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 10px;
  z-index: 0;
  object-fit: cover;
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;

  :after {
    content: "";
    height: 30px;
    width: 200px;
    background-color: red;
    z-index: 1;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

export default function ProfileHeader(props) {
  const { tipPage, user } = props;
  let profileLink;
  if (tipPage) {
    if (tipPage.primary === "twitch") {
      profileLink = `twitch.tv/${tipPage.username}`;
    } else if (tipPage.primary === "facebook") {
      profileLink = `facebook.com/${tipPage.username}`;
    } else {
      profileLink = `youtube.com/channel/${tipPage.youtube_id}`;
    }
  }

  return (
    <>
      {tipPage.cover_photo && (
        <Box width={1} height="100px" sx={{ zIndex: -1 }}>
          <StyledImage
            src={tipPage.cover_photo}
            width="500px"
            height="200px"
            alt=""
          />
        </Box>
      )}
      <Flex
        mb={4}
        alignItems="center"
        sx={{
          width: 400,
          mx: "auto",
          zIndex: 2,
          position: "relative",
          mt: tipPage.cover_photo ? [3, 4] : 0,
        }}
      >
        <Box
          sx={{
            img: {
              borderRadius: 10,
            },
          }}
        >
          <Image
            alt="Profile picture"
            height={50}
            width={50}
            src={tipPage.thumbnail}
          />
        </Box>
        <Flex ml={[3]} flexDirection="column">
          <Text mt={-2} fontSize={[24, 32]}>
            {tipPage.username}
          </Text>
          <Link href={`https://${profileLink}`}>
            <a
              style={{
                textDecoration: "none",
              }}
            >
              <Text
                fontSize={12}
                color="gray"
                sx={{ ":hover": { color: user.color || "api" } }}
              >
                {profileLink}
              </Text>
            </a>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
