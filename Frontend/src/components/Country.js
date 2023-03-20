import { useState, useEffect } from 'react';
import './Country.css';
const Country=(props)=>{
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [countryId,setCountryId]=useState();
  // let st="";
  useEffect(() => {
    // Fetch countries
    fetch('http://localhost:5000/country')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);
  // useEffect(() => {
  //   // console.log(state);
  //    st=state;
  // }, [state]);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    // Fetch states for selected country
    fetch(`http://localhost:5000/state?country=${countryId}`)
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error(err));

      const selectCountry = countries.find(country => country._id === countryId);
      setCountry(selectCountry ? selectCountry.name : "");
      // console.log(country);
     
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    // Fetch cities for selected state
    fetch(`http://localhost:5000/city?state=${stateId}`)
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error(err));

      const selectState = states.find(state => state._id === stateId);
      setState(selectState ? selectState.name : "");
    
      // console.log(country);
  };

 
  const handleLocationsData=(e)=>{
// console.log(cities);
    const selectedId = e.target.value;
    const selectCity = cities.find(city => city._id === selectedId);
    setSelectedCity(selectCity ? selectCity.name : "");
    // console.log(selectedCity);
    const locationData={
        countries:countries,
        states:states,
        cities:cities
    }
    console.log(state);
    console.log(country);
    console.log(selectedCity);
    props.onAddLocations(locationData);
  }

  return (

    <div>
        <div className='dropdown'>
      <label htmlFor="country">Country:</label>
      <select id="country" onChange={handleCountryChange} placeholder="Select Country">
      <option value="" >Select a country</option>
        {countries.map(country => (
          <>
           
          <option key={country._id} value={country._id}  >{country.name}</option>
          </>
        ))}
      </select>
      </div>
      <div className='dropdown'>
      <label htmlFor="state">State:</label>
      <select id="state" onChange={handleStateChange}>
        <option value="">Select a state</option>
        {states.map(state => (
          <option key={state._id} value={state._id}>{state.name}</option>
        ))}
      </select>
      </div>
<div className='dropdown'>
      <label htmlFor="city">City:</label>
      <select id="city" onChange={handleLocationsData}>
        <option value="" >Select a city</option>
        {cities.map(city => (
          <option key={city._id} value={city._id}>{city.name}</option>
        ))}
      </select>
      </div>
    </div>
  );
}
export default Country;



