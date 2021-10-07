import { useState, useEffect } from "react";

function EditMyGoal({
  values,
  handleEditGoal,
  handleDeleteGoal,
  errorMessage,
  isLoading,
}) {
  const closeModal = document.getElementById("button-dismiss-modal-edit-goal");

  const [title, setTitle] = useState(values.title);
  const [plan, setPlan] = useState(values.plan);

  const handleTitle = (e) => setTitle(e.target.value);
  const handlePlan = (e) => setPlan(e.target.value);

  const handleEdit = (e) => {
    e.preventDefault();
    handleEditGoal({ title, plan, _id: values._id }, closeModal);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    handleDeleteGoal({ title, plan, _id: values._id }, closeModal);
  };

  useEffect(() => {
    setTitle(values.title);
    setPlan(values.plan);
  }, [values]);

  return (
    <div
      className="modal fade"
      id="modalEditMyGoal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              editar objectivo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="button-dismiss-modal-edit-goal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label" htmlFor="edit-goal-title">
                o que pretendo alcançar?
              </label>
              <input
                className="form-control"
                type="text"
                required
                name="title"
                value={title}
                onChange={handleTitle}
                id="edit-goal-title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="edit-goal-plan">
                o meu plano para alcançar o meu objectivo
              </label>
              <textarea
                name="plan"
                required
                value={plan}
                onChange={handlePlan}
                id="edit-goal-plan"
                className="form-control"
              ></textarea>
            </div>

            <div className="modal-footer">
              <p className="error-message">{errorMessage && errorMessage}</p>
              <div>
                <button
                  className="button-secondary me-2"
                  type="submit"
                  onClick={handleDelete}
                >
                  {isLoading && (
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  Apagar Objectivo
                </button>
                <button
                  className="button-primary "
                  type="submit"
                  onClick={handleEdit}
                >
                  {isLoading && (
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  Editar Objectivo
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMyGoal;
