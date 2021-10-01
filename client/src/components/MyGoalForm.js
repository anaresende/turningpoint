function MyGoal() {
  return (
    <div>
      <h1>novo objectivo</h1>
      <form>
        <label>O que pretendo alcançar?</label>
        <input type="text" name="goal" value="" />
        <br />
        <label>O meu plano para alcançar o meu objectivo</label>
        <textarea name="goalDescription" value="" />
      </form>
    </div>
  );
}

export default MyGoal;
