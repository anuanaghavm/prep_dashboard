import React, { useEffect, useState } from "react";
import { responseTable } from "../common/Tabledata";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";

const Responses = () => {
  const [response, setResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("course"); // course, email, name

  const fetchResponse = async () => {
    try {
      const response = await allaxios.get(API_URL.RESPONSES.GET_ALL);
      setResponse(response.data);
      setFilteredResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    
    if (!value) {
      setFilteredResponse(response);
      return;
    }

    const filtered = response.filter((data) => {
      const searchValue = value.toLowerCase();
      switch (filterBy) {
        case "course":
          return data.course?.toLowerCase().includes(searchValue);
        case "email":
          return data.email?.toLowerCase().includes(searchValue);
        case "name":
          return data.full_name?.toLowerCase().includes(searchValue);
        default:
          return true;
      }
    });
    
    setFilteredResponse(filtered);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
    setSearchTerm("");
    setFilteredResponse(response);
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px'
      },
    },
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Full name',
      selector: row => row.full_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Phone number',
      selector: row => row.phone_number,
      sortable: true,
    },
    {
      name: 'School name',
      selector: row => row.school_name,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Selected option',
      selector: row => row.selected_option,
      sortable: true,
    },
    {
      name: 'Class type',
      selector: row => row.class_type,
      sortable: true,
    }
  ];

  return (
    <div className="m-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0"><u>User Responses</u></h4>
        <div className="d-flex gap-2">
          <select 
            className="form-select" 
            value={filterBy}
            onChange={handleFilterChange}
            style={{ width: '150px' }}
          >
            <option value="course">Filter by Course</option>
            <option value="email">Filter by Email</option>
            <option value="name">Filter by Name</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder={`Search by ${filterBy}...`}
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredResponse}
        pagination
        responsive
        highlightOnHover
        striped
        customStyles={customStyles}
        className="border rounded"
      />
    </div>
  );
};

export default Responses;
