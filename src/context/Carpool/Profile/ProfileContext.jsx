import { createContext, useState,useEffect} from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
import { useNavigate } from 'react-router-dom';  

export const ProfileContext = createContext()
export const ProfileContextProvider = ({ children }) => {

    const navigate = useNavigate();  
    const [openProfileSettings, setProfileSettings] = useState('profileSettings')
    const [userInfo, setUserInfo] = useState(null);
    const [userData,setUserData]= useState()
    const [firstname,setFirstname]= useState()
    const [lastname,setLastname]=useState()
    const [email,setEmail]= useState()
    const [phonNum,setPhoneNum]=useState()
    const [profilePicture,setProfilePricture] =useState()
    const hostname = window.location.hostname;






    const handleAccountSettings = (pick) => {
        setProfileSettings(pick)
    }

     useEffect(() => {
        const storedUserInfo = localStorage.getItem('User');
        if (storedUserInfo) {
        try {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            console.log("User info set:", parsedUserInfo);
        } catch (error) {
            console.error("Error parsing user info:", error);
        }
        } else {
        console.log("No user info found in localStorage");
        }
    }, []);

    const fetchUser = async()=>{
        try { 
            if(userInfo && userInfo.id){
                const result  = await fetch(BASEURL)
                const users = await result.json()
                const filtered = users.filter((u)=> u.userId == userInfo?.id)
                console.log(filtered);
                
                setUserData(filtered[0])
                setFirstname(filtered[0].userLn)
                setLastname(filtered[0].userFn)
                setEmail(filtered[0].userEmail)
                setPhoneNum(filtered[0].userPhone)

            }
        } catch (error) {
            console.log("error fecthing users");
            
        }
    }

    useEffect(()=>{
        fetchUser()
    },[userInfo])

    const handleSumitNewProfileInfo = async()=>{
        console.log("data",
                firstname,
                lastname,
                email,
                phonNum,
        );

        try {
            const response = await postRequest(`${BASEURL}/updateProfile`,JSON.stringify({firstname,lastname,
                email,
                phonNum, userId:userInfo.id}))
           navigate('/driver/Carpoollooading?route=/driver/CarpoolProfile&active=profile');


        } catch (error) {
             console.error('Error updating profile:', error);
        }

         const publicId = userInfo.id; // Assuming this holds the user's image public ID

        try {
            // Step 1: Call backend to delete the existing image
            const deleteResponse = await fetch(`${BASEURL}/deleteProfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ public_id: publicId }),
            });

            const deleteResult = await deleteResponse.json();
            console.log("Delete result:", deleteResult);

            // Check if deletion was successful or image doesn't exist
            if (deleteResult.result !== "ok" && deleteResult.result !== "not found") {
            console.error("Error deleting image");
            return
            }

            // Step 2: Upload the new image
            const data = new FormData();
            data.append("file", profilePicture);
            data.append("upload_preset", "ridesync");
            data.append("cloud_name", "drvtezcke");
            data.append("public_id", publicId); // Use the same public ID for the new image

            const res = await fetch("https://api.cloudinary.com/v1_1/drvtezcke/image/upload", {
            method: "POST",
            body: data,
            });

            const uploadedImage = await res.json();
            console.log("Uploaded Image URL:", uploadedImage.url);
        } catch (error) {
            console.error("Error handling file upload:", error);
        } 

    }

    const handleFileUpload = async (event) => {
        const val = event.target.files[0];
        if (!val) return;
        setProfilePricture(val)    
    };

    const [profileImage,setProfileImage]= useState()
    useEffect(() => {
        if (userInfo && userInfo?.id) {
            const interval = setTimeout(async() => {
            const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${userInfo?.id}?${new Date().getTime()}`;
            const response = await fetch(cloudinaryUrl)
            if(response.ok)
            setProfileImage(cloudinaryUrl);  
            else
            setProfileImage(DefaultProfile)
             
            },1); // 3000ms = 3 seconds

            // Cleanup the interval when component is unmounted or userInfo changes
            return () => clearInterval(interval);
        }
    }, [userInfo]);



    return (
        <ProfileContext.Provider
            value={{
                userInfo,
                openProfileSettings,
                handleAccountSettings,
                userData,
                firstname,
                lastname,
                email,
                phonNum,
                setFirstname,
                setLastname,
                setEmail,
                setPhoneNum,
                handleSumitNewProfileInfo,
                profileImage,
                handleFileUpload,
            }}
        >
            {children}
        </ProfileContext.Provider >
    )
}