import React, { useEffect, useState } from "react";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import "./Postcar.css";

export default function Postcar() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "",
    label: "",
    details: "",
    description: "",
    img: null,
    purchase_location: "",
    name: "",
    phone: "",
    email: "",
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setFormData((prevData) => ({
          ...prevData,
          name: decoded.name || "",
          email: decoded.email || "",
          purchase_location: decoded.location || "",
        }));
      }
    }
  }, []);

  const loadBrands = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/brands");
      const data = await response.json();
      if (data.success) {
        setBrands(data.brands);
      } else {
        console.error("Error fetching brands:", data.message);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const loadModels = async (brand) => {
    if (!brand) {
      setModels([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/models?brand=${brand}`);
      const data = await response.json();
      if (data.success) {
        setModels(data.models);
      } else {
        console.error("Error fetching models:", data.message);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (formData.brand) {
      loadModels(formData.brand);
    }
  }, [formData.brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, img: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:8000/api/uploadcars", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        alert("Car posted successfully!");
        setFormData({
          brand: "",
          model: "",
          year: "",
          price: "",
          mileage: "",
          color: "",
          transmission: "",
          label: "",
          details: "",
          description: "",
          img: null,
          purchase_location: formData.purchase_location,
          name: formData.name,
          phone: "",
          email: formData.email,
        });
      } else {
        alert("Failed to post the car. " + result.message);
      }
    } catch (error) {
      console.error("Error posting car:", error);
      alert("An error occurred while posting the car.");
    }
  };

  return (
   <>
   <CustomNavbar />
    <div className="car-form-container">
      <h1 className="form-title"> Post a Car</h1>
      <form id="car-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select a Brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="model" className="form-label">
              Model:
            </label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="form-input"
              disabled={!formData.brand}
            >
              <option value="">Select a Model</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="mileage" className="form-label">
              Mileage:
            </label>
            <input
              type="text"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="color" className="form-label">
              Color:
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>
          </div>

          <div>
            <label htmlFor="img" className="form-label">
              Image Upload:
            </label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>

          <h2 className="section-title">Contact Information</h2>

          <div>
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="phone" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Post Car
        </button>
      </form>
    </div>
    </>

  );
}