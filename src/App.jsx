import MainContent from "./compontents/mainContent";
import Container from "@mui/material/Container";
import "./App.css";
import "./Background.css";

function App() {
  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="stars-small" />
        <div className="stars-medium" />
        <div className="stars-large" />
        <div className="crescent" />
        <div className="glow-orb glow-orb--1" />
        <div className="glow-orb glow-orb--2" />
        <div className="glow-orb glow-orb--3" />
      </div>

      {/* Main Content */}
      <div className="flex justify-center w-full">
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
