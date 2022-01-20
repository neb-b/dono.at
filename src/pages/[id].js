import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import Tip from "../components/tip";

export default function TipPage() {
  const [userExists, setUserExists] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  // React.useEffect(() => {
  //   if (id) {
  //     fetch(`/api/users/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   }
  // }, [id]);

  React.useEffect(() => {
    axios.get("/api/auth");
  }, []);

  //   if (loading) {
  //     return null;
  //   }

  return (
    <div>
      <Tip username={id} />
    </div>
  );
}
