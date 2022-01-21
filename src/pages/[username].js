import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Tip from "components/Tip";
import { Box } from "rebass/styled-components";

import { getProfileData } from "../lib/db";

export default function TipPage(props) {
  // console.log("props", props);
  return (
    <Box maxWidth={460} mx="auto">
      <h1>{props.username}</h1>
      <Tip />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.query;

  // wtf is this
  const ignored = ["requestProvider.js.map"];
  if (ignored.includes(username)) {
    return { props: {} };
  }

  try {
    const data = await getProfileData(username);
    return {
      props: { username, data: data || null },
    };
  } catch (error) {
    console.log("error", error);
    return { props: {} };
  }
}
