import React, { useState } from "react";
import {
  Button,
  Input,
  Upload,
  Form,
  message,
  Spin,
  TimePicker,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import vProfileService from "../services/vProfileService";
import { uploadFile } from "../services/uploadFileService";

const { Option } = Select;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 65vh;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  margin-right: 8px;
  width: 30%;
`;

const VehicleSection = styled.div`
  background-color: white;
  padding: 20px;
  width: 65%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CreateVehicleDocumentationProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]); // Store file list state
  const [form] = Form.useForm(); // Create a form instance
  const [filePath, setFilePath] = useState("");
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const downloadUrl = await uploadFile(filePath, "asd");

      const timeValue = values.time ? values.time.format("HH:mm") : null;

      const profileData = {
        description: values.description,
        type: values.type,
        time: timeValue,
        imageUrl: downloadUrl,
      };

      // Call the service to create the profile
      await vProfileService.createProfile(profileData);

      message.success("Vehicle profile created successfully!");

      // Reset form fields after successful submission
      form.resetFields();
      setLoading(false);
    } catch (error) {
      message.error("Error creating vehicle profile. Please try again.");
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields(); // Reset the form fields manually
    setFileList([]); // Clear file list
    message.info("Form has been reset.");
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === "done" || info.file.status === "uploading") {
      setFilePath(info.fileList[0].originFileObj);
    }
  };

  return (
    <Container>
      <ProfileSection>
        <h3>Add profile picture</h3>
        <Upload listType="picture">
          <Button icon={<UploadOutlined />}>Choose File</Button>
        </Upload>
        <StyledButton type="primary">Submit</StyledButton>
      </ProfileSection>

      <VehicleSection>
        <h2>Vehicle Documentation Profile</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input placeholder="EX:Panadura-Kandy/Special Hire" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select placeholder="Select Type">
              <Option value="Normal-Daily">Normal-Daily</Option>
              <Option value="24/7">24/7 Service</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please select the time!" }]}
          >
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>

          <Form.Item
            name="vehicle_image"
            rules={[
              { required: true, message: "Please select the vehicle image!" },
            ]}
          >
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Choose Vehicle Picture</Button>
            </Upload>
          </Form.Item>

          <ButtonGroup>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? <Spin /> : "Create"}
            </Button>
            <Button danger onClick={handleReset}>
              Reset
            </Button>
          </ButtonGroup>
        </Form>
      </VehicleSection>
    </Container>
  );
};

export default CreateVehicleDocumentationProfile;
