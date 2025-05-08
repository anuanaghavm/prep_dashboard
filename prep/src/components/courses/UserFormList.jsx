import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UserFormList = () => {
  const [userForms, setUserForms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_features: '',
    image: null,
    course_description: '',
    duration: '',
    amount: '',
    course: '',
    section: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedForm(null);
    setImagePreview(null);
    setFormData({
      title: '',
      description: '',
      course_features: '',
      image: null,
      course_description: '',
      duration: '',
      amount: '',
      course: '',
      section: ''
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sections/');
      setSections(response.data);
    } catch (err) {
      console.error('Error fetching sections:', err);
    }
  };

  const fetchUserForms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userform/');
      console.log('User Forms Response:', response.data);
      // Fetch course and section details for each form
      const formsWithDetails = await Promise.all(
        response.data.map(async (form) => {
          try {
            // Fetch course details
            if (form.course) {
              const courseResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${form.course}/`);
              form.courseDetails = courseResponse.data;
            }
            // Fetch section details
            if (form.section) {
              const sectionResponse = await axios.get(`http://127.0.0.1:8000/api/sections/${form.section}/`);
              form.sectionDetails = sectionResponse.data;
            }
            return form;
          } catch (err) {
            console.error('Error fetching details:', err);
            return form;
          }
        })
      );
      console.log('Forms with details:', formsWithDetails);
      setUserForms(formsWithDetails);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user forms:', err);
      setError('Error fetching user forms');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          if (key === 'amount') {
            formDataToSend.append(key, parseFloat(formData[key]));
          } else if (key === 'course' || key === 'section') {
            formDataToSend.append(key, parseInt(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      // Log the form data being sent
      console.log('Form Data being sent:', Object.fromEntries(formDataToSend));

      if (editMode && selectedForm) {
        const response = await axios.put(`http://127.0.0.1:8000/api/userform/${selectedForm.uuid}/`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/userform/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Create Response:', response.data);
      }
      fetchUserForms();
      handleClose();
    } catch (err) {
      console.error('Error saving user form:', err.response?.data || err);
      alert('Error saving user form. Please try again.');
    }
  };

  const handleEdit = (form) => {
    setSelectedForm(form);
    setFormData({
      title: form.title,
      description: form.description,
      course_features: form.course_features,
      course_description: form.course_description,
      duration: form.duration,
      amount: form.amount,
      course: form.course?.id || form.course,
      section: form.section?.id || form.section
    });
    if (form.image) {
      setImagePreview(`http://127.0.0.1:8000${form.image}`);
    }
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/userform/${uuid}/`);
        fetchUserForms();
      } catch (err) {
        console.error('Error deleting user form:', err);
        alert('Error deleting user form');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSections();
    fetchUserForms();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>User Forms</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          Add New Form
        </Button>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Image</th>
                <th>Title</th>
                <th>Course</th>
                <th>Section</th>
                <th>Duration</th>
                <th>Amount</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userForms.map((form) => (
                <tr key={form.uuid}>
                  <td>
                    {form.image ? (
                      <img
                        src={form.image.startsWith('http') ? form.image : `http://127.0.0.1:8000/media/${form.image}`}
                        alt={form.title}
                        style={{
                          width: '100px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.open(form.image.startsWith('http') ? form.image : `http://127.0.0.1:8000/media/${form.image}`, '_blank')}
                        onError={(e) => {
                          console.error('Image load error:', e);
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjcwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNzAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <div 
                        style={{
                          width: '100px',
                          height: '70px',
                          background: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          color: '#666'
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{form.title}</td>
                  <td>{form.courseDetails?.category || 'N/A'}</td>
                  <td>{form.sectionDetails?.section_name || 'N/A'}</td>
                  <td>{form.duration}</td>
                  <td>₹{form.amount}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEdit(form)}
                      className="me-2"
                      style={{ display: 'inline-block' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(form.uuid)}
                      style={{ display: 'inline-block' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit User Form' : 'Add New User Form'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Features</Form.Label>
              <Form.Control
                type="text"
                name="course_features"
                value={formData.course_features}
                onChange={handleInputChange}
                required
                placeholder="Enter course features"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                type="text"
                name="course_description"
                value={formData.course_description}
                onChange={handleInputChange}
                required
                placeholder="Enter course description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                placeholder="Enter duration"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                placeholder="Enter amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Category</Form.Label>
              <Form.Select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course Category</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Section Category</Form.Label>
              <Form.Select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Section Category</option>
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.section_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                {...(!editMode && { required: true })}
              />
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    marginTop: '10px', 
                    maxWidth: '200px', 
                    maxHeight: '200px',
                    objectFit: 'contain' 
                  }} 
                />
              )}
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                {editMode ? 'Update Form' : 'Create Form'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserFormList; 