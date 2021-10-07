import { useState } from "react";

function AddMyGoal({ addNewGoal, errorMessage, isLoading }) {
  const [title, setTitle] = useState("");
  const [plan, setPlan] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handlePlan = (e) => setPlan(e.target.value);

  const handleSubmit = (e) => {
    const closeModal = document.getElementById("button-dismiss-modal-add-goal");

    e.preventDefault();
    const newGoal = { title, plan };

    addNewGoal(newGoal);

    setTitle("");
    setPlan("");
    closeModal.click();
  };

  return (
    <div
      className="modal fade"
      id="modalAddMyGoal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Novo Objetivo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="add-goal-title" className="form-label">
                O que pretendo alcançar?
              </label>
              <input
                id="add-goal-title"
                className="form-control"
                type="text"
                required
                name="title"
                value={title}
                onChange={handleTitle}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="add-goal-plan" className="form-label">
                O meu plano para alcançar o meu objectivo
              </label>
              <textarea
                id="add-goal-plan"
                name="plan"
                required
                className="form-control"
                value={plan}
                onChange={handlePlan}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <p className="error-message">{errorMessage && errorMessage}</p>
            <div>
              <button
                type="button"
                className="button-secondary me-2"
                data-bs-dismiss="modal"
                id="button-dismiss-modal-add-goal"
              >
                Cancelar
              </button>

              <button type="submit" className="button-primary">
                {isLoading && (
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Adicionar Objectivo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMyGoal;
