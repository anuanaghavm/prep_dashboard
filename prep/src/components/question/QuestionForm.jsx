import React, { useEffect, useState } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "" }]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await allaxios.get(API_URL.QUESTION.GET_ALL);
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions", error);
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
      fetchQuestions();
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("questionModal")
      );
      modal.hide();
      alert("Question and options added successfully!");
    } catch (error) {
      console.error("Error adding question/options", error);
    }
  };

  const handleDelete = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await allaxios.delete(API_URL.QUESTION.DELETE(questionId));
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4><u>Questions</u></h4>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#questionModal"
        >
          Add Question
        </button>
      </div>

      <div className="card p-3 mb-4">
        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <td>No.</td>
                  <td>Question</td>
                  <td>Options</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>
                    <td><strong>{question.text}</strong></td>
                    <td>
                      <ul className="list-unstyled mb-0">
                        {question.options?.map((option, i) => (
                          <li key={i}><strong>• {option.text}</strong></li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </button>
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
