import { useState, useContext, useEffect } from "react";
import MyGoal from "../components/MyGoalForm";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import EditMyGoal from "../components/EditMyGoal";

const API_URL = process.env.REACT_APP_API_URL;

function MyGoals() {
  const [goals, setGoals] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [addMode, setAddMode] = useState(null);
  const { user, logInUser } = useContext(AuthContext);
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
        setAddMode(false);
      });
  };

  const handleEditGoal = (editGoal) => {
    console.log("ediiiiiiit", editGoal);
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
  }, [editMode, addMode]);

  const handleActiveEdit = (goalValues) => {
    setEditMode(goalValues);
  };

  console.log(editMode);
  return (
    <div>
      {!editMode && !addMode && (
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
          <button onClick={() => setAddMode(true)}>Criar Objetivo</button>
          <br />
          <br />
        </div>
      )}
      {!editMode && addMode && <MyGoal addNewGoal={addNewGoal} />}
      {editMode && !addMode && (
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
