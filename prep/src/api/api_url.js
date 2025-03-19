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

};
  
export default API_URL;
