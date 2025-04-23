import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../components/Customnavbar/Customnavbar";
import Carousel_main from "../components/Crousels/Home_main";
import Carbrand from "../components/Carbrandlogo/Carbrand";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Repaircard from "../components/Home_Repaircards/Repaircard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css";
function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ["Cars", "Rent", "Repair"];

  const nextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection(
      (prevSection) => (prevSection - 1 + sections.length) % sections.length
    );
  };

  return (
    <>
      <Customnavbar />

      <div className="vh-100">
        <Carousel_main />
      </div>

      <div
        className="carbrandlogo"
        style={{ marginTop: "-10px", marginBottom: "50px" }}
      >
        <h2>We are Connected with</h2>

        <Carbrand />
      </div>

      <Container className="my-4">
        <div className={`slider-container`}>
          <div className="cars" style={{ margin: "5px 10px 50px 10px" }}>
            <h2>Choose Your Dream Car</h2>
            <div className="choose-cars">
              <div className="caritem iem1">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem2">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem3">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem4">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem5">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem6">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem7">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem8">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
            </div>
            <div className="load-more-section">
              <div className="fog-overlay"></div>
              <button className="load-more-btn">View all Cars</button>
            </div>
          </div>

          <div className="" style={{ marginTop: "90px" }}>  
            <h2>Rent Car</h2>
            <div className="cars" style={{ margin: "5px 10px 50px 10px" }}>
           
            <div className="choose-cars">
              <div className="caritem iem1">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem2">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem3">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem4">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem5">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem6">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem7">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
              <div className="caritem iem8">
                <Cards
                  title="Card 3"
                  description="This is the third card"
                  image="https://via.placeholder.com/150"
                />
              </div>
            </div>
            <div className="load-more-section">
              <div className="fog-overlay"></div>
              <button className="load-more-btn">Go to Rent</button>
            </div>
          </div>
          </div>

          <div className=''style={{marginTop:'90px'}}>
            <h2>Repair Parts</h2>
            <Repaircard/>
          </div>
        </div>
      </Container>
      <div className="footer-home">
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
