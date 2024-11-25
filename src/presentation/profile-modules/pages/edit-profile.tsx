import { useContext } from "react";
import EditUserInfo from "../components/edit-userInfo";
import ProfileContext from "../context/context";


const EditProfile = () => {
  const {user,userImage} = useContext(ProfileContext);
  

  
  if (user ) {
    return (
      <>
        <EditUserInfo data={user.data} userImage={userImage?.data ||""}  />
      </>
    );
  } else {
    return (
      <div className="relative w-full h-[250px]">
        <span className="loading-page absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      </div>
    );
  }
};

export default EditProfile;
