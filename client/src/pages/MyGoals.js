import { useState, useContext, useEffect } from "react";
import MyGoal from "../components/MyGoalForm";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import EditMyGoal from "../components/EditMyGoal";

const API_URL = process.env.REACT_APP_API_URL;

function MyGoals() {
  const [goals, setGoals] = useState([]);
  const { user, logInUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(null);
  console.log(user, logInUser);

  const addNewGoal = (newGoal) => {
    const updatedGoals = [...goals, newGoal];
    axios
      .post(`${API_URL}/user/add-my-goal`, {
        title: newGoal.title,
        plan: newGoal.plan,
        user: user._id,
      })
      .then((response) => {
        setGoals(updatedGoals);
      });
  };

  const handleEditGoal = (editGoal) => {
    axios
      .post(
        `${API_URL}/user/edit-my-goal`,
        {
          title: editGoal.title,
          plan: editGoal.plan,
          _id: editGoal._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setEditMode(null);
      });
  };

  const handleDeleteGoal = (goal) => {
    axios
      .post(
        `${API_URL}/user/delete-my-goal`,
        {
          title: goal.title,
          plan: goal.plan,
          _id: goal._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        setEditMode(null);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/my-goals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setGoals(response.data);
      });
  }, [editMode]);

  const handleActiveEdit = (goalValues) => {
    setEditMode(goalValues);
  };

  console.log(editMode);
  return (
    <div>
      {!editMode && (
        <div>
          <h1>Os meus objectivos</h1>
          {goals.map(({ title, plan, _id }) => {
            return (
              <div key={title}>
                {title}
                <button onClick={() => handleActiveEdit({ title, plan, _id })}>
                  editar
                </button>
              </div>
            );
          })}
          <br />
          <br />
        </div>
      )}
      {!editMode && <MyGoal addNewGoal={addNewGoal} />}
      {editMode && (
        <EditMyGoal
          values={editMode}
          handleEditGoal={handleEditGoal}
          handleDeleteGoal={handleDeleteGoal}
        />
      )}
    </div>
  );
}
export default MyGoals;
