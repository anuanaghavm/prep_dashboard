import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";

const ResponseForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    school_name: '',
    location: '',
    class_type: 'offline'
  });

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await allaxios.get(API_URL.QUESTION.GET_ALL);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit each answer as a separate response
      for (const [questionId, selectedOption] of Object.entries(answers)) {
        const response = await allaxios.post(API_URL.RESPONSES.CREATE, {
          ...formData,
          question: questionId,
          selected_option: selectedOption
        });
      }
      
      setSubmitted(true);
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        school_name: '',
        location: '',
        class_type: 'offline'
      });
      setAnswers({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container className="mt-5">
        <Card className="text-center p-5">
          <h4 className="text-success">Thank you for your response!</h4>
          <Button 
            variant="primary" 
            className="mt-3"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Response
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Response Form</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your school name"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your location"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Class Type</Form.Label>
                  <Form.Select
                    name="class_type"
                    value={formData.class_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <hr className="my-4" />
            <h5 className="mb-4">Questions</h5>

            {questions.map((question) => (
              <Form.Group key={question.id} className="mb-4">
                <Form.Label><strong>Q: {question.text}</strong></Form.Label>
                <div>
                  {question.options?.map((option) => (
                    <Form.Check
                      key={option.id}
                      type="radio"
                      id={`option-${option.id}`}
                      name={`question-${question.id}`}
                      label={option.text}
                      onChange={() => handleAnswerChange(question.id, option.id)}
                      checked={answers[question.id] === option.id}
                      required
                    />
                  ))}
                </div>
              </Form.Group>
            ))}

            <div className="text-center mt-4">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Response'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResponseForm; 