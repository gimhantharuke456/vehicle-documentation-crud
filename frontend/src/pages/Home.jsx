import React from "react";
import {
  MainContainer,
  PrimaryButton,
} from "../components/reusable.components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          background: "rgba(255,255,255,0.6)",
          width: 500,
          height: 200,
        }}
      >
        <p style={{ fontSize: 32, fontWeight: "bold" }}>
          Vehicle Documentation
        </p>
        <PrimaryButton
          onClick={() => {
            navigate("/menu");
          }}
          style={{ background: "blue" }}
        >
          Next
        </PrimaryButton>
      </div>
    </MainContainer>
  );
};

export default Home;
