import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Popconfirm,
  Spin,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import vehicleApiService from "../services/vehicleService";
import styled from "styled-components";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Container = styled.div`
  padding: 20px;
  height: 70vh;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 16px;
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form] = Form.useForm();

  // Fetch vehicle profiles
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await vehicleApiService.getAllVehicles();
        setVehicles(response);
        setFilteredVehicles(response);
        setError(null);
      } catch (err) {
        setError("Failed to load vehicle profiles.");
        message.error("Error fetching vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);
  const fetchVehicless = async () => {
    setLoading(true);
    try {
      const response = await vehicleApiService.getAllVehicles();
      setVehicles(response);
      setFilteredVehicles(response);
      setError(null);
    } catch (err) {
      setError("Failed to load vehicle profiles.");
      message.error("Error fetching vehicles.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (vehicleId) => {
    try {
      await vehicleApiService.deleteVehicle(vehicleId);
      await fetchVehicless();
      message.success("Vehicle deleted successfully.");
    } catch (err) {
      message.error("Failed to delete vehicle.");
    }
  };

  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle);
    form.setFieldsValue(vehicle);
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    try {
      const updatedVehicle = await form.validateFields();
      await vehicleApiService.updateVehicle(editingVehicle._id, updatedVehicle);
      await fetchVehicless();
      message.success("Vehicle updated successfully.");

      setEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update vehicle.");
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = vehicles.filter((vehicle) =>
      vehicle.vehicleNo.toLowerCase().includes(searchValue)
    );
    setFilteredVehicles(filtered);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Vehicle No",
      "Description",
      "Time",
      "Vehicle Type",
      "License Expiry",
    ];
    const tableRows = filteredVehicles.map((vehicle) => [
      vehicle.vehicleNo,
      vehicle.description,
      vehicle.timeDuration,
      vehicle.vehicleType,
      moment(vehicle.licenseExp).format("MMMM Do, YYYY"),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
    doc.save("vehicle_list.pdf");
  };

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicleNo",
      key: "vehicleNo",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "timeDuration",
      key: "timeDuration",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "License Expiry",
      dataIndex: "licenseExp",
      key: "licenseExp",
      render: (licenseExp) => {
        const formattedDate = moment(licenseExp).format("MMMM Do, YYYY");
        const isExpired = moment(licenseExp).isBefore(moment());

        return (
          <span style={{ color: isExpired ? "red" : "green" }}>
            {formattedDate}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => handleEditClick(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this vehicle?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <Container>
        <Spin tip="Loading..." />
      </Container>
    );
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <SearchBar placeholder="Search vehicle no" onChange={handleSearch} />
      <Table
        style={{ height: "55vh" }}
        columns={columns}
        dataSource={filteredVehicles}
        rowKey="id"
      />
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={handleGeneratePDF}
      >
        Print Details
      </Button>

      <Modal
        title="Edit Vehicle"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Vehicle No"
            name="vehicleNo"
            rules={[{ required: true, message: "Please enter vehicle number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time Duration"
            name="timeDuration"
            rules={[{ required: true, message: "Please enter time duration" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vehicle Type"
            name="vehicleType"
            rules={[{ required: true, message: "Please enter vehicle type" }]}
          >
            <Select>
              <Select.Option value="Van">Van</Select.Option>
              <Select.Option value="Bus">Bus</Select.Option>
              <Select.Option value="Bike">Bike</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="License Expiry"
            name="licenseExp"
            rules={[
              { required: true, message: "Please enter license expiry date" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default VehicleList;
