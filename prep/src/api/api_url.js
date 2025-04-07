const API_URL = {
    // AUTH: {
    //   REGISTER: "/api/register/",
    //   LOGIN: "/api/login/",
    //   FORGOT_PASSWORD:"/api/change-password/"
    // },
    CONTACT: {
      GET_CONTACT: "/api/contact/",
      POST_CONTACT: "/api/contact/",
      CONTACT_PATCH: (id) => `/api/contact/${id}/`,
      CONTACT_DELETE: (id) => `/api/contact/${id}/`,
    },
    
    BLOGCATEGORIES: {
        GET_BLOGCATEGORIES: "/api/categories/",
        POST_BLOGCATEGORIES: "/api/categories/",
        PATCH_BLOGCATEGORIES: (id) => `/api/categories/${id}/`,
        DELETE_BLOGCATEGORIES: (id) => `/api/categories/${id}/`,
      },
    
    BLOGCARD: {
        GET_BLOGCARD: "/api/blogcard/",
        POST_BLOGCARD: "/api/blogcard/",
        PATCH_BLOGCARD: (id) => `/api/blogcard/${id}/`,
        DELETE_BLOGCARD: (id) => `/api/blogcard/${id}/`,
      }, 
    FORM: {
        GET_ALL: "/api/submit-form/list/",
        CREATE: "/api/submit-form/",
        UPDATE: (id) => `/api/submit-form/${id}/`,
        DELETE: (id) => `/api/submit-form/${id}/`,
    },
    PREFERRED_PROGRAM: {
        GET_ALL: "/api/preferred-programs/",
        CREATE: "/api/preferred-programs/",
        UPDATE: (id) => `/api/preferred-programs/${id}/`,
        DELETE: (id) => `/api/preferred-programs/${id}/`,
        
    },
    META_TAG_CONTACT: {
      GET_ALL: "/api/contactmeta/",
      CREATE: "/api/contactmeta/",
      UPDATE: (id) => `/api/contactmeta/${id}/`,
      DELETE: (id) => `/api/contactmeta/${id}/`,
    },

    META_TAG_COURSES: {
      GET_ALL: "/api/coursemeta/",
      CREATE: "/api/coursemeta/",
      UPDATE: (id) => `/api/coursemeta/${id}/`,
      DELETE: (id) => `/api/coursemeta/${id}/`,
    },
    META_TAG_BLOGES: {
      GET_ALL: "/api/blogmeta/",
      CREATE: "/api/blogmeta/",
      UPDATE: (id) => `/api/blogmeta/${id}/`,
      DELETE: (id) => `/api/blogmeta/${id}/`,
    },
    META_TAG_ABOUTUS: {
      GET_ALL: "/api/aboutmeta/",
      CREATE: "/api/aboutmeta/",
      UPDATE: (id) => `/api/aboutmeta/${id}/`,
      DELETE: (id) => `/api/aboutmeta/${id}/`,
    },
    META_TAG_HOME: {
      GET_ALL: "/api/homemeta/",
      CREATE: "/api/homemeta/",
      UPDATE: (id) => `/api/homemeta/${id}/`,
      DELETE: (id) => `/api/homemeta/${id}/`,
    },
    QUESTION: {
      GET_ALL: "/api/questions/",
      CREATE: "/api/create-question/",
      UPDATE: (id) => `/api/question/${id}/`,
      DELETE: (id) => `/api/question/${id}/`,
    },
    OPTIONS : {
      // GET_ALL: "/api/questions/",
      CREATE: "/api/create-option/",
      UPDATE: (id) => `/api/option/${id}/`,
      DELETE: (id) => `/api/option/${id}/`,
    },
    RESPONSES: {
      GET_ALL: "/api/user-responses/",
      CREATE: "/api/submit-response/",
      }
};
  
export default API_URL;
