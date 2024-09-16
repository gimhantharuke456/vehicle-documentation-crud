import React from "react";
import {
  MainContainer,
  PrimaryButton,
} from "../components/reusable.components";
import { useNavigate } from "react-router-dom";

const VehicleProfilesHome = () => {
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
        <p style={{ fontSize: 32, fontWeight: "bold" }}>Vehicle Profile</p>
        <PrimaryButton
          onClick={() => {
            navigate("/vehicle-profile-list");
          }}
          style={{ background: "blue" }}
        >
          Next
        </PrimaryButton>
      </div>
    </MainContainer>
  );
};

export default VehicleProfilesHome;
