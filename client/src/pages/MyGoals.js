import "./MyGoals.css";
import { useState, useContext, useEffect } from "react";
import AddMyGoal from "../components/AddMyGoal";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import EditMyGoal from "../components/EditMyGoal";

const API_URL = process.env.REACT_APP_API_URL;

function MyGoals() {
  const [goals, setGoals] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useContext(AuthContext);

  const addNewGoal = (newGoal) => {
    setIsLoading(true);

    axios
      .post(`${API_URL}/user/add-my-goal`, {
        title: newGoal.title,
        plan: newGoal.plan,
        user: user._id,
      })
      .then((response) => {
        setAddMode(false);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  };

  const handleEditGoal = (editGoal, closeModal) => {
    setIsLoading(true);

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
        setEditMode(false);
        setIsLoading(false);
        closeModal.click();
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error";
        setErrorMessage(errorDescription);
        setIsLoading(false);
      });
  };

  const handleDeleteGoal = (goal, closeModal) => {
    setIsLoading(true);

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
        setEditMode(false);
        setIsLoading(false);
        closeModal.click();
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error";
        setErrorMessage(errorDescription);
        setIsLoading(false);
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
    console.log(goalValues);
    setEditMode(goalValues);
  };

  console.log(goals);
  return (
    <section className="MyGoals">
      <div className="container-xxl mt-5 pt-5 ">
        <h2 className="text-rose">os meus objectivos</h2>
        <div className="row row-cols-auto mt-5">
          {goals.map(({ title, plan, _id }) => {
            return (
              <div className="col-12 col-md-6 pb-4" key={title}>
                <div className="MyGoals-item p-4">
                  <h5>{title}</h5>
                  <p className="MyGoals-plan">{plan}</p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="styled-link-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#modalEditMyGoal"
                      onClick={() => handleActiveEdit({ title, plan, _id })}
                    >
                      editar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {goals && goals?.length === 0 && (
          <div className="row mt-5 pt-5">
            <h3 className="text-orange text-center">
              pronto para um desafio ?
            </h3>
          </div>
        )}
        <div className="row row-cols-auto mt-5">
          <button
            className="mt-3 mx-auto button-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAddMyGoal"
            onClick={() => setAddMode(true)}
          >
            Criar Objetivo
          </button>
        </div>
        <AddMyGoal
          addNewGoal={addNewGoal}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <EditMyGoal
          values={editMode}
          handleEditGoal={handleEditGoal}
          handleDeleteGoal={handleDeleteGoal}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </section>
  );
}
export default MyGoals;
