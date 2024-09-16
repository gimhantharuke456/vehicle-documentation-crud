import React from "react";
import styled from "styled-components";
import { FaBell, FaBus, FaDochub } from "react-icons/fa"; // Using FontAwesome for icons
import {
  MainContainer,
  PrimaryButton,
} from "../components/reusable.components";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 50vw;
`;

const Card = styled.div`
  width: 200px;
  height: 250px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 16px;
  color: red;
  text-align: center;
`;

const ActionButton = ({ icon, label, onClick, title }) => (
  <Card onClick={onClick}>
    <Title style={{ fontSize: 18, textAlign: "center" }}>{title}</Title>
    <IconContainer>{icon}</IconContainer>
    <Label>{label}</Label>
    <PrimaryButton style={{ background: "blue" }}>View</PrimaryButton>
  </Card>
);

const MainMenuC = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Container>
        <ActionButton
          title={"Vehicle Profile"}
          onClick={() => {
            navigate("/home");
          }}
          icon={<FaBus size={30} />}
          label="Add vehicle profiles"
        />
        <ActionButton
          title={"Vehicle Documentation"}
          onClick={() => {
            navigate("/vehicle-document-menu");
          }}
          icon={<FaDochub size={30} />}
          label="Add vehicle documentation"
        />
        <ActionButton
          title={"Notifications"}
          onClick={() => {
            navigate("/notifications");
          }}
          icon={<FaBell size={30} />}
          label="Notifications"
        />
      </Container>
    </MainContainer>
  );
};

export default MainMenuC;
