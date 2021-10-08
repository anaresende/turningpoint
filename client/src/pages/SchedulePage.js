import imageSchedule from "../assets/images/horarios-2021.png";

function Schedule() {
  return (
    <div className="container-xxl">
      <h2 className="text-rose pt-5">horários</h2>
      <h4 className="text-orange mt-2 mb-5 pb-4">ano letivo 2021/2022</h4>
      <img src={imageSchedule} alt="horários 2021" />
    </div>
  );
}

export default Schedule;
