import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import AddPostModal from "../components/AddPostModal.jsx";
import BasicCard from "../components/Card.jsx";
import NotFound from "./NotFound";
import Alert from "@mui/material/Alert";
import GET_USER_BY_ID from "../graphql/queries/getUserById"

export default function Profile() {
  const { id } = useParams();

  const [closeSucess, setCloseSucess] = useState(
    Boolean(localStorage.getItem("signupCompleted"))
  );

  const { data, error, loading } = useQuery(GET_USER_BY_ID, {
    variables: { userId: id },
  });

  if (error) return <div> {NotFound()} </div>;

  if (loading) return <div> LOADING... </div>;

  const { getUserById } = data;

  const hasPosts = getUserById.posts?.length !== 0;

  return (
    <div>
      {closeSucess ? (
        <>
        <Alert
          onClose={() => {
            setCloseSucess(false);
            localStorage.removeItem("signupCompleted");
          }}
        >
          SIGN UP done successfully
        </Alert>
          <br></br><br></br>
        </>
      ) : (
        <div></div>
      )}

      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{getUserById.name}</h1>
          <h6><span style={{fontWeight: "bold"}}>Age:</span> {getUserById.age}</h6>
        </div>
        <AddPostModal />
      </div>
      <div>
        <div>
          <h4 style={{ color: "#55ab89", fontWeight: "bold" }}>My posts</h4>
        </div>
        {hasPosts ? (
          getUserById.posts?.map((post) => {
            return (
              <BasicCard
                key={post.id}
                title={post.title}
                content={post.message}
              />
            );
          })
        ) : (
          <div style={{ color: "#ff6900", fontWeight: "bold", textAlign: "center" }}>
            {" "}
            <br></br>
            USER DOES NOT HAVE POSTS...{" "}
          </div>
        )}
      </div>
    </div>
  );
}
