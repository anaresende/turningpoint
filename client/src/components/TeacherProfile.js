import "./TeacherProfile.css";

const TeacherProfile = ({ photo, name }) => (
  <div className="teachersThumb">
    <div>
      <img src={photo} alt={`photo of ${name}`} className="teacherPic" />
    </div>
    <div>
      <h5 className="teacherName">{name}</h5>
    </div>
  </div>
);

export default TeacherProfile;
