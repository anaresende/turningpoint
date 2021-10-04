import { useState } from "react";

function EditMyGoal({ values, handleEditGoal, handleDeleteGoal }) {
  const [title, setTitle] = useState(values.title);
  const [plan, setPlan] = useState(values.plan);

  const handleTitle = (e) => setTitle(e.target.value);
  const handlePlan = (e) => setPlan(e.target.value);

  const handleEdit = (e) => {
    e.preventDefault();

    handleEditGoal({ title, plan, _id: values._id });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    handleDeleteGoal({ title, plan, _id: values._id });
  };

  return (
    <div>
      <h2>editar objectivo</h2>
      <form>
        <label>O que pretendo alcançar?</label>
        <input
          type="text"
          required
          name="title"
          value={title}
          onChange={handleTitle}
        />
        <br />
        <label>O meu plano para alcançar o meu objectivo</label>
        <textarea
          name="plan"
          required
          value={plan}
          onChange={handlePlan}
        ></textarea>
        <br />
        <button type="submit" onClick={handleEdit}>
          Editar Objectivo
        </button>
        <button type="submit" onClick={handleDelete}>
          Apagar Objectivo
        </button>
      </form>
    </div>
  );
}

export default EditMyGoal;
