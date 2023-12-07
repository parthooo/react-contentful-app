import React, { useEffect, useState } from "react";
import { client } from "../../client";
import './Cards.css'; 
import Loader from '../Loader/Loader';

const Card = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    // Simulating a data fetching operation
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate an API call
        const response = await client.getEntries({
          content_type: "cards",
        });
        const responseData = response.items[0].fields;
        setData(responseData);
        // Update the state with the fetched data
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // Call the fetchData function
    
  }, []);
  
  console.log(data);
  return (
    <>
    <div className="card">
      {/* <h2 className="card-title">{data?.description?.content[0]?.content[0]?.value}</h2> */}
      <div className="card-content">
        <h2 className="card-title">{data?.title}</h2>
        <p className="card-description">{data?.description?.content[0]?.content[0]?.value}</p>
      </div>
    </div>
    </>
  );
};

export default Card;
