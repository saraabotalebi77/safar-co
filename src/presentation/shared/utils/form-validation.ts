const mobileNumberRegex = /^(?:\+98|0|98)9(0[0-5]|[13]\d|2[0-3]|9\d)\d{7}$/;
const otpRegex = /^[a-zA-Z0-9]{4}$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^*&%$#@!]).{8,}$/;
const formValidation = (name:string,value:string)=>{
    switch(name){
        case "mobile" : 
            return mobileNumberRegex.test(value);
        case "otp":
            return otpRegex.test(value);
        case "password":
            return passwordRegex.test(value);

    }
}

export default formValidation;