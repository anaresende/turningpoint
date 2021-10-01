import { useState, useContext, useEffect } from "react";
import MyGoal from "../components/MyGoalForm";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function MyGoals() {
  const [goals, setGoals] = useState([]);
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
        setGoals(updatedGoals);
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
  }, []);

  return (
    <div>
      <h1>Os meus objectivos</h1>
      {goals.map((goal) => {
        return <div key={goal.title}>{goal.title}</div>;
      })}
      <br />
      <br />
      <MyGoal addNewGoal={addNewGoal} />
    </div>
  );
}
export default MyGoals;
