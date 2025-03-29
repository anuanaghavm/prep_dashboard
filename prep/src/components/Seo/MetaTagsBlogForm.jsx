import React, { useState } from "react";

const MetaTagsBlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    meta_description: "",
    meta_keywords: "",
    slug: "",
    canonical_url: "",
    h1_tag: "",
    content: "",
    word_count: 0,
    image_alt_text: "",
    image_filename: null,
    internal_links: "",
    external_links: "",
    anchor_text: "",
    schema_type: "",
    json_ld_schema: "",
    og_title: "",
    og_description: "",
    og_image: null,
    twitter_card: "",
    twitter_title: "",
    twitter_description: "",
    twitter_image: null,
    noindex: false,
    nofollow: false,
    amp_enabled: false,
    lazy_load_images: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/meta-tags-blog/", {
        method: "POST", // or "PUT" for update
        body: data,
      });

      if (response.ok) {
        alert("Meta Tags submitted successfully!");
        // Optionally reset form
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">SEO Meta Tags Blog</h2>

      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input" />
      <textarea name="meta_description" placeholder="Meta Description" value={formData.meta_description} onChange={handleChange} className="textarea" />
      <textarea name="meta_keywords" placeholder="Meta Keywords" value={formData.meta_keywords} onChange={handleChange} className="textarea" />
      <input type="text" name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="input" />
      <input type="url" name="canonical_url" placeholder="Canonical URL" value={formData.canonical_url} onChange={handleChange} className="input" />
      <input type="text" name="h1_tag" placeholder="H1 Tag" value={formData.h1_tag} onChange={handleChange} className="input" />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} className="textarea" />
      <input type="number" name="word_count" placeholder="Word Count" value={formData.word_count} onChange={handleChange} className="input" />
      <input type="text" name="image_alt_text" placeholder="Image Alt Text" value={formData.image_alt_text} onChange={handleChange} className="input" />
      <input type="file" name="image_filename" accept="image/*" onChange={handleChange} className="input" />
      <textarea name="internal_links" placeholder="Internal Links (comma separated)" value={formData.internal_links} onChange={handleChange} className="textarea" />
      <textarea name="external_links" placeholder="External Links" value={formData.external_links} onChange={handleChange} className="textarea" />
      <input type="text" name="anchor_text" placeholder="Anchor Text" value={formData.anchor_text} onChange={handleChange} className="input" />
      <input type="text" name="schema_type" placeholder="Schema Type" value={formData.schema_type} onChange={handleChange} className="input" />
      <textarea name="json_ld_schema" placeholder="JSON-LD Schema" value={formData.json_ld_schema} onChange={handleChange} className="textarea" />
      <input type="text" name="og_title" placeholder="OG Title" value={formData.og_title} onChange={handleChange} className="input" />
      <textarea name="og_description" placeholder="OG Description" value={formData.og_description} onChange={handleChange} className="textarea" />
      <input type="file" name="og_image" accept="image/*" onChange={handleChange} className="input" />
      <input type="text" name="twitter_card" placeholder="Twitter Card Type" value={formData.twitter_card} onChange={handleChange} className="input" />
      <input type="text" name="twitter_title" placeholder="Twitter Title" value={formData.twitter_title} onChange={handleChange} className="input" />
      <textarea name="twitter_description" placeholder="Twitter Description" value={formData.twitter_description} onChange={handleChange} className="textarea" />
      <input type="file" name="twitter_image" accept="image/*" onChange={handleChange} className="input" />
      <label><input type="checkbox" name="noindex" checked={formData.noindex} onChange={handleChange} /> Noindex</label>
      <label><input type="checkbox" name="nofollow" checked={formData.nofollow} onChange={handleChange} /> Nofollow</label>
      <label><input type="checkbox" name="amp_enabled" checked={formData.amp_enabled} onChange={handleChange} /> AMP Enabled</label>
      <label><input type="checkbox" name="lazy_load_images" checked={formData.lazy_load_images} onChange={handleChange} /> Lazy Load Images</label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
};

export default MetaTagsBlogForm;
