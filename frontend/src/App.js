import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import CreateVehicleProfile from "./pages/CreateVehicleProfile";
import VehicleList from "./pages/VehicleList";
import Menu from "./pages/Menu";
import MainMenuC from "./pages/MainMenuC";
import VehicleProfilesHome from "./pages/VehicleProfilesHome";
import CreateVehicleDocumentationProfile from "./pages/CreateVehicleDocumentationProfile";
import VehicleProfileList from "./pages/VehicleProfileList";
import Notifications from "./pages/Notifications";
const Header = styled.header`
  background-color: #f0f0f0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;
const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;
const Footer = styled.footer`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  max-height: 60px;
`;
function App() {
  return (
    <div
      style={{
        backgroundImage: `url('bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header>
        <Logo>INDIKA MOTORS & TRANSPORT (PVT) LTD</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/vehicle-profile-list">Vehicle profiles</NavLink>
          <NavLink href="/vehicle-list">Vehicle List</NavLink>
          <NavLink href="/new">New Vehicle</NavLink>
        </Nav>
      </Header>
      <BrowserRouter>
        <Routes>
          <Route element={<MainMenuC />} path="/" />
          <Route element={<VehicleList />} path="/vehicle-list" />
          <Route element={<Menu />} path="/vehicle-document-menu" />
          <Route element={<CreateVehicleProfile />} path="/new" />
          <Route element={<VehicleProfilesHome />} path="/home" />
          <Route element={<Notifications />} path="/notifications" />
          <Route
            element={<CreateVehicleDocumentationProfile />}
            path="/create-new-vehicle-profile"
          />
          <Route
            element={<VehicleProfileList />}
            path="/vehicle-profile-list"
          />
        </Routes>
      </BrowserRouter>{" "}
      <Footer>
        <div>
          <h4>Quick Links</h4>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/vehicle-list">Vehicle profiles</NavLink>
          <NavLink href="#">Bus Timetables</NavLink>
        </div>
        <div>
          <h4>Extra Links</h4>
          <NavLink href="#">About us</NavLink>
          <NavLink href="#">Privacy policy</NavLink>
          <NavLink href="#">Terms of Travel</NavLink>
        </div>
        <div>
          <h4>Contact Information</h4>
          <p>📞 081-2223344</p>
          <p>📞 071-5554443</p>
          <p>✉️ indikamotors@gmail.com</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <NavLink href="#">Facebook</NavLink>
          <NavLink href="#">Instagram</NavLink>
          <NavLink href="#">Twitter</NavLink>
        </div>
      </Footer>
    </div>
  );
}

export default App;
