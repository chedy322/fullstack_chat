import { useEffect, useState } from "react";
import "./search.css";
// import Filter from "../../components/filter/Filter";
import { useLoaderData } from "react-router-dom";
import Filter from "../component/filter/Filter";

function Search() {
 
// const result=useLoaderData()
// console.log(result)
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <h1>hey</h1>
        </div>
      </div>
    </div>
  );
}

export default Search;
