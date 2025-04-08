import React, { useEffect, useState } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const QuestionForm = () => {
  const [responses, setResponses] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "" }]);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const res = await allaxios.get(API_URL.RESPONSES.GET_ALL);
      setResponses(res.data);
    } catch (error) {
      console.error("Error fetching responses", error);
    }
  };

  const handleQuestionChange = (e) => setQuestionText(e.target.value);

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index].text = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, { text: "" }]);

  const resetForm = () => {
    setQuestionText("");
    setOptions([{ text: "" }]);
  };

  const handleSubmit = async () => {
    try {
      const questionRes = await allaxios.post(API_URL.QUESTION.CREATE, {
        text: questionText,
      });

      const questionId = questionRes.data.data.id;

      for (let option of options) {
        await allaxios.post(API_URL.OPTIONS.CREATE, {
          question: questionId,
          text: option.text,
        });
      }

      resetForm();
      fetchResponses();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("questionModal")
      );
      modal.hide();
      alert("Question and options added successfully!");
    } catch (error) {
      console.error("Error adding question/options", error);
    }
  };

  // 👇 Group responses by user (e.g. by email)
  const groupResponsesByUser = (responses) => {
    const grouped = {};

    responses.forEach((res) => {
      const key = res.email; // Or use res.phone_number
      if (!grouped[key]) {
        grouped[key] = {
          ...res,
          questions: [],
        };
      }

      grouped[key].questions.push({
        question: res.question_text,
        answer: res.selected_option_text,
      });
    });

    return Object.values(grouped);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4><u>Responses</u></h4>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#questionModal"
        >
          Add Question
        </button>
      </div>

      <div className="card p-3 mb-4">
        {responses.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>sl.no</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>School Name</th>
                  <th>Location</th>
                  <th>Class Type</th>
                  <th>Questions</th>
                  <th>Answers</th>
                </tr>
              </thead>
              <tbody>
                {groupResponsesByUser(responses).map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.school_name}</td>
                    <td>{user.location}</td>
                    <td>{user.class_type}</td>
                    <td>
                      <ul className="mb-0 ps-3">
                        {user.questions.map((q, i) => (
                          <li key={i}><strong>{q.question}</strong></li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul className="mb-0 ps-3">
                        {user.questions.map((q, i) => (
                          <li key={i}>{q.answer}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <div
        className="modal fade"
        id="questionModal"
        tabIndex="-1"
        aria-labelledby="questionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="questionModalLabel">
                Add New Question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter question text"
                value={questionText}
                onChange={handleQuestionChange}
              />

              <h6>Options:</h6>
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Option ${index + 1}`}
                  value={opt.text}
                  onChange={(e) => handleOptionChange(index, e)}
                />
              ))}

              <button
                className="btn btn-outline-secondary mt-2"
                onClick={addOption}
              >
                Add Option
              </button>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
