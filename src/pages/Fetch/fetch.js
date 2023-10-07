import React, { useEffect, useState } from "react";
import Navbar from '../Nav'
import './fetch.css'
import { Link } from "react-router-dom";
import Footer from "../Footer";


function Fetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://172.22.81.182:8080/rfid/getall")
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          setData(actualData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="overflow-x-auto mt-8 shadow-black">
        <table className="table table-zebra mx-auto w-1/2">
          <thead className="bg-yellow-400 text-black">
            <tr>
              <th className="text-center w-1/4">AWB</th>
              <th className="text-center w-1/4">Sender Data</th>
              <th className="text-center w-1/4">Origin Data</th>
              <th className="text-center w-1/4">Destination</th>
              <th className="text-center w-1/4">Tracking</th>
            </tr>
          </thead>
          <tbody className='tboby'>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="text-center align-middle w-1/4">{item.awb}</td>
                <td className="text-center align-middle w-1/4">{item.sender_data}</td> 
                <td className="text-center align-middle w-1/4">{item.origin_data}</td>
                <td className="text-center align-middle w-1/4">{item.destination_data}</td>
                <td>
                  {/* Link to Shipping component with data */}
                  <Link
  to={{
    pathname: `/shipping/${item.awb}`,
    state: {
      awb: item.awb,
      sender_data: item.sender_data,
      origin_data: item.origin_data,
      destination_data: item.destination_data,
    },
  }}
>
  <button className="btn hover:bg-yellow-400 hover:text-black">
    Track
  </button>
</Link>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Footer />
      </div>
    </div>
  );
}

export default Fetch;
