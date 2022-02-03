import React from "react";
import Link from "next/link";
import { Button, Text, Box, Flex, Image } from "rebass/styled-components";
import EditIcon from "components/EditIcon";

const EditButton = ({ imageExists }) => {
  return (
    <Button
      sx={{
        position: "absolute",
        top: 0,
        zIndex: 5,
        color: "white",
        bg: "transparent",
        right: 0,
        display: "flex",
        alignItems: "center",
        mt: ["10px", 0],

        ":hover": {
          bg: "transparent",
          "*": {
            color: "primary",
            fill: "primary",
            stroke: "primary",
          },
        },
      }}
    >
      <EditIcon />
      <Text ml={2}>{imageExists ? "Edit" : "Add"} Picture</Text>
    </Button>
  );
};

export default function ProfileHeader(props) {
  const { tipPage, user, editing } = props;
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
      {(tipPage.cover_photo || editing) && (
        <Box
          height="210px"
          sx={{
            position: ["absolute", "relative"],
            top: 0,
            zIndex: 0,
            width: ["100%", "500px"],
          }}
        >
          {editing && <EditButton imageExists={tipPage.cover_photo} />}
          {editing && !tipPage.cover_photo && (
            <Box
              width="500px"
              height="200px"
              sx={{
                borderRadius: [0, 10, 10],
                border: ["none", "1px dashed white"],
                background: `repeating-linear-gradient(
                      45deg,
                      black,
                      black 10px,
                      #111 10px,
                      #111 20px
                    )`,
              }}
            />
          )}

          {tipPage.cover_photo && (
            <>
              <Image
                src={tipPage.cover_photo}
                width="500px"
                height="200px"
                alt=""
                sx={{
                  borderRadius: [0, 20, 20],
                  zIndex: 0,
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
              <Box
                sx={{
                  zIndex: 4,
                  position: "relative",
                  padding: "10px",
                  height: "200px",
                  width: "500px",
                  boxShadow: "0 0 90px 60px black inset",
                }}
              />
            </>
          )}
        </Box>
      )}

      <Flex
        mb={4}
        alignItems="center"
        mt={[-2, "-77px"]}
        sx={{
          width: 400,
          mx: "auto",
          zIndex: 4,
          position: "relative",
          mt: tipPage.cover_photo ? [3, 4] : 0,
          px: [4, 0],
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
