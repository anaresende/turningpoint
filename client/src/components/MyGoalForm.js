import { useState } from "react";

function MyGoal({ addNewGoal }) {
  const [title, setTitle] = useState("");
  const [plan, setPlan] = useState("");

  const handleTitle = (e) => setTitle(e.target.value);
  const handlePlan = (e) => setPlan(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = { title, plan };

    addNewGoal(newGoal);

    setTitle("");
    setPlan("");
  };

  return (
    <div>
      <h2>novo objectivo</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Adicionar Objectivo</button>
      </form>
    </div>
  );
}

export default MyGoal;
