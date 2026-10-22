
import api from "./api";


// Register api
export const registerapi = (formData) => {
  return api.post("auth/register/", {
    username: formData.fullName,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirm_password,
  });
};

// login api
export const loginapi=(formdata)=>{
    return api.post("auth/login/",{
        email:formdata.email,   
        password:formdata.password
    });
};


export const verifyOtp=(formdata)=>{
    return api.post('auth/verify-otp/',{
        email:formdata.email,
        otp:formdata.otp,
    });
};