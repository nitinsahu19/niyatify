import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import { selectUserProfile } from "../../redux/reducers/userSlice";
import { showNotification } from "../../redux/reducers/notificationSlice";

const UserProfile = () => {
  const user = useSelector(selectUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    about: user?.about || "",
    photoUrl: user?.photoUrl || "",
    emailId: user?.emailId || "",
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : "",
  });


  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    dispatch(
      updateUser({
        ...profile,
        skills: profile.skills.split(",").map((skill) => skill.trim()), // convert string to array
      })
    );
    dispatch(
      showNotification({
        type: "success",
        message: "User updated successfully!!",
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl shadow-lg rounded-xl bg-base-300 p-6 md:flex md:gap-8 ">
        {/* Profile Card */}
        <div className="md:w-1/3 text-center border-r mb-6 md:mb-0 ">
          {profile?.photoUrl && (
            <img
              className="w-32 h-32 rounded-full mx-auto mb-4 border"
              src={profile?.photoUrl}
              alt="Profile"
            />
          )}
          <h2 className="text-xl font-semibold">
            {profile.firstName + " " + profile.lastName}
          </h2>
          <p>{profile.emailId}</p>
          <p className="text-gray-500">
            {profile?.gender.slice(0, 1).toUpperCase() +
              profile?.gender.slice(1)}
          </p>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 px-4 py-2 rounded transition btn btn-secondary"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Edit Profile Form */}
        <div className="md:w-2/3">
          {isEditing ? (
            <form className="space-y-4">
              {/* First name */}
              <div>
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* Last name */}
              <div>
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block font-medium">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="emailId"
                  value={profile.emailId}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* About */}
              <div>
                <label className="block font-medium">About</label>
                <input
                  type="text"
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block font-medium">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              {/* Photo url */}
              <div>
                <label className="block font-medium">Photo URL</label>
                <input
                  type="text"
                  name="photoUrl"
                  value={profile.photoUrl}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded p-2"
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="text-base-content space-y-2">
              <p>
                <span className="font-medium text-secondary">About:</span>{" "}
                {profile.about}
              </p>
              <p>
                <span className="font-medium text-secondary">Skills:</span>{" "}
                {profile.skills}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
