import axios from "axios";
import React from "react";
import Link from "next/link";
import { Button, Text, Box, Flex, Image } from "rebass/styled-components";
import EditIcon from "components/EditIcon";
import { useDropzone } from "react-dropzone";
import { UserContext } from "pages/_app";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#fdaa26";
  }
  return "#eee";
};

function StyledDropzone({ username, children, setContextUser }) {
  const [error, setError] = React.useState();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    ...rest
  } = useDropzone({
    accept: "image/jpeg, image/png",
    validator: (file) => {
      if (file.size > 5242880) {
        setError("File is too big");

        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    },
  });

  const image = acceptedFiles[0];

  React.useEffect(() => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      axios
        .post("api/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          setContextUser(data.user);
        });
    }
  }, [image, username, setContextUser]);

  return (
    <Box
      {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      sx={{
        borderRadius: [0, "20px"],
        border: [
          "none",
          `2px dashed ${getColor({
            isDragAccept,
            isDragReject,
            isFocused,
            rest,
          })}`,
        ],
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: ["default", "pointer"],
        width: ["100%", "505px"],
        height: "205px",

        ":hover .edit-button *": {
          color: "primary",
          fill: "primary",
          stroke: "primary",
        },
      }}
    >
      {children}
      {error && (
        <Text mt={[0, 2]} ml={[4, 0]} color="red">
          {error}
        </Text>
      )}
      <input {...getInputProps()} />
    </Box>
  );
}

const EditButton = ({ imageExists }) => {
  return (
    <Box sx={{ position: "relative", top: 0 }}>
      <Button
        diabled
        className="edit-button"
        sx={{
          position: "absolute",
          color: "white",
          bg: "transparent",
          right: 0,
          display: "flex",
          alignItems: "center",
          mt: ["10px", 0],
          zIndex: 6,

          ":hover": {
            background: "transparent",
          },
        }}
      >
        <EditIcon />
        <Text ml={2}>{imageExists ? "Edit" : "Add"} Picture</Text>
      </Button>
    </Box>
  );
};

export default function ProfileHeader(props) {
  const { contextUser, setContextUser } = React.useContext(UserContext);
  const { tipPage, user, editing, view } = props;
  const coverPhoto = contextUser?.cover_url || user.cover_url;

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

  const Wrapper =
    editing && view !== "tip"
      ? (props) => <StyledDropzone {...props} setContextUser={setContextUser} />
      : Box;

  return (
    <>
      {(coverPhoto || editing) && (
        <Box
          height="210px"
          sx={{
            position: ["absolute", "relative"],
            top: 0,
            zIndex: 0,
            width: ["100%", "500px"],
          }}
        >
          <Wrapper username={tipPage.username}>
            {editing && <EditButton imageExists={coverPhoto} />}
            {editing && !coverPhoto && (
              <Box
                width={["100%", "500px"]}
                height="200px"
                sx={{
                  borderRadius: [0, 20, 20],
                  background: `repeating-linear-gradient(
                      45deg,
                      black,
                      black 10px,
                      #222 10px,
                      #222 20px
                    )`,
                }}
              />
            )}

            {coverPhoto && (
              <>
                <Image
                  src={coverPhoto}
                  width={["100%", "500px"]}
                  height="200px"
                  alt=""
                  sx={{
                    borderRadius: [0, "20px", "20px"],
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
                    borderRadius: [0, "20px", "20px"],
                    width: ["auto", "500px"],
                    boxShadow: "0 0 90px 60px black inset",
                  }}
                />
              </>
            )}
          </Wrapper>
        </Box>
      )}

      <Flex
        mb={4}
        alignItems="center"
        mt={coverPhoto || editing ? [-2, "-77px"] : 5}
        sx={{
          pointerEvents: "none",
          width: ["100%", 400],
          mx: [undefined, "auto"],
          zIndex: 4,
          position: "relative",
          mt: coverPhoto ? [3, 4] : 0,
          pl: [4, 0],
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
