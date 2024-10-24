import { useState } from "react";
import "./Filter.css";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const[searchParams,setSearchParams]=useSearchParams()
  const [query,setQuery]=useState({
    username:searchParams.get('username')||null
  })
  function handleChange(e){
    return(setQuery({...query,[e.target.name]:e.target.value}))
  }
  function handleClick(e){
    e.preventDefault()
    setSearchParams(query)
    // console.log(searchParams)
  }
  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("username")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="gender">Type</label>
          <select name="gender" id="type" onChange={handleChange}>
            <option value="other">other</option>
            <option value="female">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Grade</label>
          <input
            type="number"
            id="minPrice"
            name="mingrade"
            placeholder="any"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Grade</label>
          <input
            type="number"
            id="maxPrice"
            name="maxgrade"
            placeholder="any"
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="country">country</label>
          <input
            type="text"
            id="bedroom"
            name="country"
            placeholder="country"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleClick}>
            Search
        </button>
      </div>
    </div>
  );
}

export default Filter;
