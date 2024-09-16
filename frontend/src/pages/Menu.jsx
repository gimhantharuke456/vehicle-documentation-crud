import React from "react";
import styled from "styled-components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Using FontAwesome for icons
import { MainContainer } from "../components/reusable.components";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #d3d3d3;
  padding: 20px;
  width: 100vw;
`;

const Card = styled.div`
  width: 150px;
  height: 200px;
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

const ActionButton = ({ icon, label, onClick }) => (
  <Card onClick={onClick}>
    <IconContainer>{icon}</IconContainer>
    <Label>{label}</Label>
  </Card>
);

const Menu = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Container>
        <ActionButton
          onClick={() => {
            navigate("/new");
          }}
          icon={<FaPlus size={30} />}
          label="Add Vehicle"
        />
        <ActionButton
          onClick={() => {
            navigate("/vehicle-list");
          }}
          icon={<FaEdit size={30} />}
          label="Edit Vehicle"
        />
        <ActionButton
          onClick={() => {
            navigate("/vehicle-list");
          }}
          icon={<FaTrash size={30} />}
          label="Delete Vehicle"
        />
      </Container>
    </MainContainer>
  );
};

export default Menu;
