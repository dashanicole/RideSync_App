import { createContext, useCallback, useState } from "react";
import { nameRegex, emailRegex, phoneRegex } from "../../../constant/regexConstants.JSX";
import { BASEURL, postRequest } from "../../../utils/Service";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const RegisterContext = createContext()

export const RegisterContextProvider = ({ children }) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [demographStat, setDemographStat] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleFirstname = (e) => setFirstname(e.target.value);
    const handleLastname = (e) => setLastname(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleCountry = (selectedCountry) => setCountry(selectedCountry);
    const handleDemoStat = (e) => setDemographStat(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();
    const handleMouseDownConfPassword = (event) => event.preventDefault();
    const handleMouseUpConfPassword = (event) => event.preventDefault();

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/passenger/login');
    };



    const handleRegister = async () => {
        const newErrors = {};

        if (typeof firstname !== 'string' || firstname.trim() === '') newErrors.firstname = "Firstname is required.";
        else if (!nameRegex.test(firstname)) newErrors.firstname = "Firstname must contain only letters.";

        if (typeof lastname !== 'string' || lastname.trim() === '') newErrors.lastname = "Lastname is required.";
        else if (!nameRegex.test(lastname)) newErrors.lastname = "Lastname must contain only letters.";

        if (!email) newErrors.email = "Email is required";
        else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

        if (!phone) newErrors.phone = "Phone number is required";
        else if (!phoneRegex.test(phone)) newErrors.phone = "Phone number must be at least 10 digits";

        if (!age) newErrors.age = "Age is required";
        else if (age < 18) newErrors.age = "You're not allowed, you must be 18 years old or above"
        else if (age <= 0) newErrors.age = "Age must be a positive number"

        if (!gender) newErrors.gender = "Gender is required";

        // if (!country) newErrors.country = "Country is required";

        // if (!demographStat) newErrors.demographStat = "Demographic Status is required"

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";

        if (password !== confirmPassword) newErrors.confirmPassword = "Password do not match";


        if (Object.keys(newErrors).length > 0) {
            console.log("Validation errors:", newErrors);
            setErrors(newErrors);

            return;
        }


        const userInfo = {
            "userLn": firstname,
            "userFn": lastname,
            "userEmail": email,
            "userPhone": phone,
            "userAge":age,
            "userPassword": password,
            "userType": "P",
            "userRating": 5,
            "gender": gender.charAt(0).toUpperCase(),
            "country": country,
            "demoStat": demographStat

        };
        console.log("User Info:", userInfo);




        const response = await postRequest(`${BASEURL}/register`, JSON.stringify(userInfo));



        if (response.error) {
            console.log(response.error);
        } else {
            console.log("Succesfully registered");
            loginUser(userInfo.userEmail,userInfo.userPassword)
        }
        setErrors({});
    };


      const loginUser = async (email,pass) => {
       
        
        try {
            const response = await postRequest(`${BASEURL}/login`, JSON.stringify({userEmail:email,userPassword:pass}));
            if (response && response.user && response.token && response.user?.userType == "P") {
                localStorage.setItem("User", JSON.stringify(response.user));
                localStorage.setItem("Token", response.token);
                navigate('/passenger/homeContents');
                console.log("Login successful, navigating to homeContents");
            } else if (response.user?.userType != "P") {
                throw new Error(response.message || "You have no access to this page");
            }
            else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }  
    };



    return (
        <RegisterContext.Provider
            value={{
                firstname,
                lastname,
                email,
                phone,
                age,
                gender,
                country,
                demographStat,
                password,
                confirmPassword,
                handleFirstname,
                handleLastname,
                handleEmail,
                handlePhone,
                handleAge,
                handleGender,
                handleCountry,
                handleDemoStat,
                handlePassword,
                handleConfirmPassword,
                showPassword,
                showConfirmPassword,
                handleClickShowPassword,
                handleClickShowConfirmPassword,
                handleMouseDownPassword,
                handleMouseUpPassword,
                handleMouseDownConfPassword,
                handleMouseUpConfPassword,

                handleRegister,
                errors
            }}
        >
            {children}
        </RegisterContext.Provider>
    )
}