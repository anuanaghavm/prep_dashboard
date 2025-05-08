import React, { useState, useEffect, useRef } from "react";
import "../../style/BlogCard.css";
import { Modal, Button } from "react-bootstrap"; 
import allaxios from "../../api/axios"; 
import API_URL from "../../api/api_url"; 
import $ from "jquery"; // jQuery is required for Summernote
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "summernote/dist/summernote-bs4.css";
import "summernote/dist/summernote-bs4.js";

const BlogCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFullContentModal, setShowFullContentModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alt_image_text, setalt_image_text] = useState("");
  const [alt_image_caption, setalt_image_caption] = useState("");
  const [alt_image_title, setalt_image_title] = useState("");
  const [alt_image_description, setalt_image_description] = useState("");
  const [slug, setslug] = useState("");
  const [category, setCategory] = useState("");
  const [editBlogId, setEditBlogId] = useState(null);

  const descriptionRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (showModal) {
      // Ensure jQuery is properly initialized
      if (typeof window.jQuery !== 'undefined') {
        // Initialize Summernote with Bootstrap 5 compatibility
        $(descriptionRef.current).summernote({
          height: 300,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview', 'help']]
          ],
          callbacks: {
            onChange: function (contents) {
              setDescription(contents);
            }
          }
        });
      }
    }
    return () => {
      if (descriptionRef.current) {
        $(descriptionRef.current).summernote('destroy');
      }
    };
  }, [showModal]);

  const fetchBlogs = async () => {
    try {
      const response = await allaxios.get(API_URL.BLOGCARD.GET_BLOGCARD);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await allaxios.get(API_URL.BLOGCATEGORIES.GET_BLOGCATEGORIES);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("alt_image_text", alt_image_text);
    formData.append("alt_image_title", alt_image_title);
    formData.append("alt_image_caption", alt_image_caption);
    formData.append("alt_image_description", alt_image_description);
    formData.append("slug", slug);
    formData.append("category", category);

    try {
      if (editBlogId) {
        await allaxios.patch(API_URL.BLOGCARD.PATCH_BLOGCARD(editBlogId), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await allaxios.post(API_URL.BLOGCARD.POST_BLOGCARD, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchBlogs();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error posting/updating blog:", error.response?.data || error.message);
    }
  };

  const handleEdit = (blog) => {
    setEditBlogId(blog.id)
    setTitle(blog.title);
    setDescription(blog.description);
    setalt_image_caption(blog.alt_image_caption);
    setalt_image_text(blog.alt_image_text);
    setalt_image_description(blog.alt_image_description);
    setalt_image_title(blog.alt_image_title);
    setCategory(blog.category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await allaxios.delete(API_URL.BLOGCARD.DELETE_BLOGCARD(id));
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error.response?.data || error.message);
      }
    }
  };

  const resetForm = () => {
    setEditBlogId(null);
    setImage(null);
    setTitle("");
    setDescription("");
    setalt_image_text("");
    setalt_image_title("");
    setalt_image_caption("");
    setalt_image_description("");
    setslug("");
    setCategory("");
  };

  const handleNew = () => {
    resetForm();
    setShowModal(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleViewFullContent = (blog) => {
    setSelectedBlog(blog);
    setShowFullContentModal(true);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>Blog Posts</u></b>
        </h2>
        <button 
          className="btn" 
          onClick={handleNew}
          style={{backgroundColor: "#FF6B45", color: "white", border: "none"}}
        >
          Add New Blog
        </button>
      </div>

      <div className="row g-4">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div 
              className={`col-12 ${index < 3 ? 'col-md-4' : 'col-md-6'}`} 
              key={blog.id}
            >
              <div className="card h-100 shadow-lg hover-effect">
                <div className="position-relative">
                  <img 
                    src={blog.image} 
                    className="card-img-top" 
                    alt={blog.alt_image_text || "Blog"} 
                    style={{
                      height: "250px",
                      objectFit: "cover"
                    }}
                  />
                  <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{
                      background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      color: "white"
                    }}
                  >
                    <h5 className="card-title mb-0">{blog.title}</h5>
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <div 
                    className="card-text flex-grow-1 mb-3" 
                    style={{
                      maxHeight: "100px",
                      overflow: "hidden"
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: truncateText(blog.description, 150) 
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <button 
                      className="btn"
                      onClick={() => handleViewFullContent(blog)}
                      style={{backgroundColor: "#FF6B45", color: "white", border: "none"}}
                    >
                      Read More
                    </button>
                    <div>
                      <button 
                        className="btn btn-outline-primary me-2"
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No blogs available. Click "Add New Blog" to create one.
            </div>
          </div>
        )}
      </div>

      {/* Full Content Modal */}
      <Modal size="lg" show={showFullContentModal} onHide={() => setShowFullContentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBlog?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <img 
                src={selectedBlog.image} 
                className="img-fluid rounded mb-4" 
                alt={selectedBlog.alt_image_text || "Blog"} 
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover"
                }}
              />
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
              />
              {(selectedBlog.alt_image_text || selectedBlog.alt_image_title || 
                selectedBlog.alt_image_caption || selectedBlog.alt_image_description || 
                selectedBlog.slug) && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="mb-3">Additional Information</h6>
                  {selectedBlog.alt_image_text && (
                    <p className="mb-2"><strong>Image Text:</strong> {selectedBlog.alt_image_text}</p>
                  )}
                  {selectedBlog.alt_image_title && (
                    <p className="mb-2"><strong>Image Title:</strong> {selectedBlog.alt_image_title}</p>
                  )}
                  {selectedBlog.alt_image_caption && (
                    <p className="mb-2"><strong>Image Caption:</strong> {selectedBlog.alt_image_caption}</p>
                  )}
                  {selectedBlog.alt_image_description && (
                    <p className="mb-2"><strong>Image Description:</strong> {selectedBlog.alt_image_description}</p>
                  )}
                  {selectedBlog.slug && (
                    <p className="mb-0"><strong>Slug:</strong> {selectedBlog.slug}</p>
                  )}
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowFullContentModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Add/Edit Blog */}
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editBlogId ? "Edit Blog" : "Add New Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea ref={descriptionRef} defaultValue={description}></textarea>
            </div>
            <div className="form-group">
              <label>alt_image_text</label>
              <textarea className="form-control" value={alt_image_text} onChange={(e) => setalt_image_text(e.target.value)} />
            </div>
            <div className="form-group">
              <label>alt_img_title</label>
              <textarea className="form-control" value={alt_image_title} onChange={(e) => setalt_image_title(e.target.value)} />
            </div>
            <div className="form-group">
              <label>alt_img_caption</label>
              <textarea className="form-control" value={alt_image_caption} onChange={(e) => setalt_image_caption(e.target.value)} />
            </div>
            <div className="form-group">
              <label>alt_img_description</label>
              <textarea className="form-control" value={alt_image_description} onChange={(e) => setalt_image_description(e.target.value)} />
            </div>
            <div className="form-group">
              <label>slug</label>
              <textarea className="form-control" value={slug} onChange={(e) => setslug(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 text-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-success">{editBlogId ? "Update" : "Save"}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BlogCard;
