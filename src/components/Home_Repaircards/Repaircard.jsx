import React from "react";
import "./Home_repair.css";
import { Link } from "react-router-dom";
import img1 from '../../assets/repair/bmw-b58-engine.webp';
import img2 from '../../assets/repair/car-engine-bg-1.jpg';
import img3 from '../../assets/repair/engines.jpg';
import img4 from '../../assets/repair/images2.jpeg';
import img5 from '../../assets/repair/images4.jpeg';
import img6 from '../../assets/repair/images5.jpeg';
import img7 from '../../assets/repair/img2.jpeg';
import img8 from '../../assets/repair/istockphoto-1284776529-612x612.jpg';
import img9 from '../../assets/repair/SC06_2005_Lamborghini_Gallardo_engine.jpg';

function Repair() {
  return (
    <div className="carrepair">
      <div className="repairlogo logo">
        <ul className="repairlogo-list">
          <li className="item item1">
            <img src={img1} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item2">
            <img src={img2} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item3">
            <img src={img3} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item4">
            <img src={img4} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item5">
            <img src={img5} alt="partsswagen" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item6">
            <img src={img6} alt="partsedes" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item7">
            <img src={img7} alt="partsorghini" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item8">
            <img src={img8} alt="partsari" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item9">
            <img src={img9} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
        </ul>

        {/* Duplicate the values */}
        <ul className="repairlogo-list">
          <li className="item item1">
            <img src={img1} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item2">
            <img src={img2} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item3">
            <img src={img3} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item4">
            <img src={img4} alt="parts" />
            <Link to="/details4">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item5">
            <img src={img5} alt="partsswagen" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item6">
            <img src={img6} alt="partsedes" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item7">
            <img src={img7} alt="partsorghini" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item8">
            <img src={img8} alt="partsari" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
          <li className="item item9">
            <img src={img9} alt="parts" />
            <Link to="/">
              <button>Details</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Repair;
