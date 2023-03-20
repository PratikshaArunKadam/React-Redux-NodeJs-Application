import React, { useState, useEffect } from "react";
import axios from "axios";
import './Home.css'
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import { selectUser } from "../loginFeatures/userSlice";
const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

// const user=useSelector(selectUser);
  // useEffect(()=>{
  //  ` ${user} ? <Home></Home> :<LoginPage></LoginPage>`
  // },[]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://restcountries.com/v3.1/${search ? `name/${search}` : `region/${region}`}`
      );
      setCountries(response.data);
    };

    fetchData();
  }, [search, region]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setCurrentPage(1);
  };

  const handlePaginationChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderCountries = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = countries.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div class='mt-4'>
      <table>
        <thead>
          <tr>
            {/* <th>Sr. No.</th> */}
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((country, index) => (
            <tr key={country.name.common}>
              {/* <td>{index + 1}</td> */}
              <td>{country.name.common}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>{country.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {countries.length > itemsPerPage &&
          Array.from({ length: Math.ceil(countries.length / itemsPerPage) }, (_, i) => (
            
            <span key={i + 1} id={i + 1} onClick={handlePaginationChange}>
              {i + 1}
            </span>
          ))}
      </div>
    </div>
    
    );
  };

  return (
    <>
  <Navigation></Navigation>
    <div className='containerr'>
     
      <div className="search ml-1">
       
        <select value={region} onChange={handleRegionChange} className='dropdowndiv'>
          <option value="">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
        <input type="text" placeholder="Search by country name" className="inputSearch ml-2 pl-1" onChange={handleSearchChange} />
      </div>
      {renderCountries()}
    </div>
    </>
  );
};

export default Home;
