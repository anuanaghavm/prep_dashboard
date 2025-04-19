import React, { useEffect, useState } from "react";
import { responseTable } from "../common/Tabledata";
import DataTable from "react-data-table-component";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";

const Responses = () => {
  const [response, setResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("course");

  const fetchResponse = async () => {
    try {
      const response = await allaxios.get(API_URL.RESPONSES.GET_ALL);
      // Group responses by student
      const groupedResponses = groupResponsesByStudent(response.data);
      setResponse(groupedResponses);
      setFilteredResponse(groupedResponses);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to group responses by student
  const groupResponsesByStudent = (responses) => {
    const grouped = {};
    
    responses.forEach(res => {
      const key = `${res.email}-${res.phone_number}`; // Unique key combining email and phone
      
      if (!grouped[key]) {
        grouped[key] = {
          id: res.id,
          name: res.full_name,
          email: res.email,
          phone: res.phone_number,
          school: res.school_name,
          place: res.location,
          classtype: res.class_type,
          responses: []
        };
      }
      
      grouped[key].responses.push({
        question: res.question_text,
        answer: res.selected_option_text
      });
    });

    return Object.values(grouped);
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
          return data.school?.toLowerCase().includes(searchValue);
        case "email":
          return data.email?.toLowerCase().includes(searchValue);
        case "name":
          return data.name?.toLowerCase().includes(searchValue);
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
      name: 'I.',
      selector: row => row.id,
      sortable: true,
      width: '60px'
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '180px'
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
      width: '130px'
    },
    {
      name: 'School',
      selector: row => row.school,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Place',
      selector: row => row.place,
      sortable: true,
      width: '120px'
    },
    {
      name: 'Q & A',
      selector: row => (
        <div className="py-2">
          {row.responses.map((r, i) => (
            <div key={i} className={i !== row.responses.length - 1 ? 'mb-3 pb-3 border-bottom' : ''}>
              <div className="mb-1">
                <strong style={{ color: '#2c5282' }}>Q:</strong> {r.question}
              </div>
              <div className="ps-3">
                <strong style={{ color: '#38a169' }}>A:</strong> {r.answer}
              </div>
            </div>
          ))}
        </div>
      ),
      sortable: false,
      width: '300px'
    },
    {
      name: 'Class',
      selector: row => row.classtype,
      sortable: true,
      width: '100px'
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
