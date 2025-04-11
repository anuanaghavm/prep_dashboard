import React, { useEffect, useState } from "react";
import { responseTable } from "../common/Tabledata";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";

const Responses = () => {
  const [response, setResponse] = useState([]);
  const [courseSearch, setCourseSearch] = useState();

  const fetchResponse = async () => {
    try {
      const response = await allaxios.get(API_URL.RESPONSES.GET_ALL);
      console.log(response);

      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const {value} = e.target
    setCourseSearch(value)
    const fitteredResponse = response.filter((data) =>
      data.course.toLowerCase().includes(value.toLowerCase())
    );
    setResponse(fitteredResponse)
  };  

  useEffect(() => {
    fetchResponse();
  }, []);

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center bg-light rounded shadow p-3 my-3">
        <h4>User Responses</h4>
        <div className="d-flex me-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search course"
            onChange={handleSearch}
            value={courseSearch}
          />
          <button className="form-control w-50 bg-primary">Filter</button>
        </div>
      </div>
      <DataTable
        data={response}
        column={responseTable()}
        pagination
      ></DataTable>
    </div>
  );
};

export default Responses;
