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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center ms-4">
        <h4><u>Blog Posts</u></h4>
        <button className="btn btn-primary" onClick={handleNew}>Add New</button>
      </div>
      <div className="blog-card-grid row row-cols-1 row-cols-md-2 mt-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="col d-flex justify-content-center" key={blog.id}>
              <div className="card blog-card shadow-lg" >
                <img src={blog.image} className="card-img-top blog-card-img" alt="Blog" style={{height: "200px", objectFit: "cover"}} />
                <div className="card-body d-flex flex-column" style={{overflowY: "auto"}}>
                  <h5 className="card-title">{blog.title}</h5>
                  <div className="card-text" dangerouslySetInnerHTML={{ __html: truncateText(blog.description, 200) }} />
                  <div className="d-flex justify-content-between mt-auto">
                    <button className="btn btn-primary" onClick={() => handleViewFullContent(blog)}>Read More</button>
                    <div>
                      <button className="btn btn-info me-2" onClick={() => handleEdit(blog)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">No blogs available</p>
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
              <img src={selectedBlog.image} className="img-fluid mb-3" alt="Blog" style={{width: "100%", height: "300px", objectFit: "cover"}} />
              <div dangerouslySetInnerHTML={{ __html: selectedBlog.description }} />
              <div className="mt-3">
                <h5>{selectedBlog.alt_image_text}</h5>
                <h5>{selectedBlog.alt_image_title}</h5>
                <h5>{selectedBlog.alt_image_caption}</h5>
                <h5>{selectedBlog.alt_image_description}</h5>
                <h5>{selectedBlog.slug}</h5>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFullContentModal(false)}>
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
