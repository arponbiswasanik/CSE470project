import React, { useState } from "react";
import "../Carbrandlogo/Carbrandlogo.css";
import audi from "../../assets/brandlogo/audi-logo-2016-640.png";
import marcedes from "../../assets/brandlogo/Mercedes-Benz-logo-2011-640x369.jpg";
import nissan from "../../assets/brandlogo/nissan-logo-2020-black-show.png";
import subaru from "../../assets/brandlogo/subaru-logo-2019-640.png";
import toyota from "../../assets/brandlogo/toyota-logo-2020-europe-640.png";
import volkswagen from "../../assets/brandlogo/Volkswagen-logo-2019-640x500.jpg";
import ferrari from "../../assets/brandlogo/ferrari-logo-2002-640.png";
import bmw from "../../assets/brandlogo/bmw-logo-2020-gray.png";
import lambogini from "../../assets/brandlogo/lamborghini-logo-1998-640.png";

// function Brandlogo() {
// const [index, setIndex] = useState(0);

// const handleSelect = (selectedIndex) => {
//   setIndex(selectedIndex);
// };

function BrandLogo() {
  return (
    <div className="carbrand">
      <div className="brandlogo logo">
        <ul className="brandlogo-list">
          <li className="item item1">
            <img src={audi} alt="Audi" />
          </li>
          <li className="item item2">
            <img src={toyota} alt="Toyota" />
          </li>
          <li className="item item3">
            <img src={nissan} alt="Nissan" />
          </li>
          <li className="item item4">
            <img src={subaru} alt="Subaru" />
          </li>
          <li className="item item5">
            <img src={volkswagen} alt="Volkswagen" />
          </li>
          <li className="item item6">
            <img src={marcedes} alt="Mercedes" />
          </li>
          <li className="item item7">
            <img src={lambogini} alt="Lamborghini" />
          </li>
          <li className="item item8">
            <img src={ferrari} alt="Ferrari" />
          </li>
          <li className="item item9">
            <img src={bmw} alt="BMW" />
          </li></ul>
          {/* duplicate the values */}
          <ul className="brandlogo-list"> 
          <li className="item item1">
            <img src={audi} alt="Audi" />
          </li>
          <li className="item item2">
            <img src={toyota} alt="Toyota" />
          </li>
          <li className="item item3">
            <img src={nissan} alt="Nissan" />
          </li>
          <li className="item item4">
            <img src={subaru} alt="Subaru" />
          </li>
          <li className="item item5">
            <img src={volkswagen} alt="Volkswagen" />
          </li>
          <li className="item item6">
            <img src={marcedes} alt="Mercedes" />
          </li>
          <li className="item item7">
            <img src={lambogini} alt="Lamborghini" />
          </li>
          <li className="item item8">
            <img src={ferrari} alt="Ferrari" />
          </li>
          <li className="item item9">
            <img src={bmw} alt="BMW" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BrandLogo;
