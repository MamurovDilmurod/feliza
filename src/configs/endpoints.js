export const endpoints = {
  auth: {
    login: "/api/auth/loginCustomer",
    register: "/api/auth/register",
    isRegistered: "/api/auth/isRegistered",
    register: "/api/auth/register",
    forgetPassword: "/api/auth/forgetPassword",
    smsCodeVerification: "/api/auth/smsCodeVerification",
    sendVerifyCodeForgetPassword: "/api/auth/sendVerifyCodeForForgetPassword",
  },
  address: {
    addAddress: "/api/address/addAddress",
    editAddress: "/api/address/editAddress/",
    deleteAddress: "/api/address/deleteAddress/",
    getAllAddresses: "/api/address/getAllAddresses",
    getAddressByCustumerId: "/api/address/getAddressesByCustomerId/",
  },
  brand: {
    getAllBrands: "",
    getBrandById: "",
  },
  category: {},
  products: {},
};
