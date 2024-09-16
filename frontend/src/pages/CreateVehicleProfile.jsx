import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import vehicleApiService from "../services/vehicleService";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  height: 70vh;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  background-color: #f0f0f0;
  flex: 1;
  height: 90%;
  justify-content: center;
`;

const ProfilePic = styled.div`
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  flex: 3;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  flex: 2;
  margin-top: 16px;
`;

const CreateVehicleProfile = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleUpload = (info) => {
    console.log("File uploaded:", info.file.name);
    message.success(`${info.file.name} file uploaded successfully.`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { vehicleNo, description, timeDuration, vehicleType, licenseExp } =
        values;
      const vehicleData = {
        vehicleNo,
        description,
        timeDuration,
        vehicleType,
        licenseExp,
      };

      await vehicleApiService.createVehicle(vehicleData);
      message.success("Vehicle profile created successfully!");

      // Reset form after success
      form.resetFields();
    } catch (error) {
      message.error("Error creating vehicle profile.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
    message.error("Please complete the required fields.");
  };

  return (
    <Container>
      <ProfileSection>
        <p>Add Profile Picture</p>
        <ProfilePic>
          <UploadOutlined style={{ fontSize: 40 }} />
        </ProfilePic>
        <Upload onChange={handleUpload}>
          <Button icon={<UploadOutlined />}>Choose File</Button>
        </Upload>
        <Button type="primary" style={{ marginTop: 20 }} disabled>
          Submit
        </Button>
      </ProfileSection>

      <FormContainer>
        <StyledForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Vehicle No"
            name="vehicleNo"
            rules={[
              { required: true, message: "Please enter the vehicle number" },
            ]}
          >
            <Input placeholder="Enter vehicle number" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Time Duration"
            name="timeDuration"
            rules={[
              { required: true, message: "Please enter the time duration" },
            ]}
          >
            <Input placeholder="Enter time duration" />
          </Form.Item>

          <Form.Item
            label="Vehicle Type"
            name="vehicleType"
            rules={[
              { required: true, message: "Please enter the vehicle type" },
            ]}
          >
            <Input placeholder="Enter vehicle type" />
          </Form.Item>

          <Form.Item
            label="License Exp."
            name="licenseExp"
            rules={[
              {
                required: true,
                message: "Please enter the license expiration",
              },
            ]}
          >
            <Input placeholder="Enter license expiration" />
          </Form.Item>

          <ButtonGroup>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Saving..." : "Create"}
            </Button>
            <Button danger htmlType="reset">
              Reset
            </Button>
          </ButtonGroup>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default CreateVehicleProfile;
