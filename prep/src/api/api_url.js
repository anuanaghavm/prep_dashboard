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

};
  
export default API_URL;
