import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import API_URL from "../../api/api_url";
import { Modal } from "react-bootstrap";
import "../../style/BlogCategories.css";

const BlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  console.log(name);

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  const fetchBlogCategories = async () => {
    try {
      const response = await allaxios.get(
        API_URL.BLOGCATEGORIES.GET_BLOGCATEGORIES
      );
      console.log(response);

      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleNew = () => {
    setShowForm(true);
    setCategory("");
    setError("");
  };
  const handleEdit = (blogcategory) => {
    setShowForm(true);
    setEditId(blogcategory.id);
    setCategory(blogcategory.category);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blogcategory?")) {
      try {
        await allaxios.delete(API_URL.BLOGCATEGORIES.DELETE_BLOGCATEGORIES(id));
        fetchBlogCategories();
      } catch (error) {
        console.error("Error deleting blogcategories:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = { category };

    try {
      if (editId) {
        await allaxios.patch(
          API_URL.BLOGCATEGORIES.PATCH_BLOGCATEGORIES(editId),
          formData
        );
      } else {
        await axios.post(API_URL.BLOGCATEGORIES.POST_BLOGCATEGORIES, formData);
      }
      fetchBlogCategories();
      setShowForm(false);
    } catch (error) {
      setError("Failed to save contact. Please try again.");
      console.error("Error saving form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h4><u>Blog Categories</u></h4>
        <button className="btn btn-primary" onClick={handleNew}>
          Add New
        </button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>Sl No</th>
            <th style={{ width: "200px" }}>Category Name</th>
            <th style={{ width: "100px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(category)}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal centered show={showForm} onHide={() => setShowForm(false)}>
        <div className="modal-overlay">
          <div className="modal-content p-3">
            <h5>Add Category</h5>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Category Name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogCategories;
