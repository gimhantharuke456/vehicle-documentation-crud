import React from "react";
import styled from "styled-components";

// Profile Picture Component
const ProfilePictureContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChooseFileButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #357abd;
  }
`;

export const ProfilePicture = () => (
  <ProfilePictureContainer>
    <ProfileImage>
      <span>👤</span>
    </ProfileImage>
    <ChooseFileButton>Choose File</ChooseFileButton>
  </ProfilePictureContainer>
);

// Form Field Component
const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FormField = ({ label, type = "text", ...props }) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input type={type} {...props} />
  </FormGroup>
);

// Button Component
const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
`;

export const PrimaryButton = styled(StyledButton)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const SecondaryButton = styled(StyledButton)`
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const TertiaryButton = styled(StyledButton)`
  background-color: #2196f3;
  color: white;
  &:hover {
    background-color: #1e88e5;
  }
`;

export const MainContainer = styled.div`
  height: 70vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;
