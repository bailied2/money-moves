import "./styles/CreateClassroom.css";

export default function CreateClassroom() {
  return (
    <form className="create_classroom_form" action="">
      <fieldset>
        <legend>Create Classroom</legend>
        <label>
          Classroom Name: {" "}
          <input
            type="text"
            id="create_classroom_name"
            name="create_classroom_name"
          />
        </label>
        <br />
        <label>
          Start Date: {" "}
          <input
            type="date"
            id="create_classroom_start_date"
            name="create_classroom_start_date"
          />
        </label>
        <br />
        <label>
          End Date: {" "}
          <input
            type="date"
            id="create_classroom_end_date"
            name="create_classroom_end_date"
          />
        </label>
        <br />
        <br />
        {/* <input
          type="checkbox"
          id="classroom_savings"
          name="classroom_savings"
          checked
        /><label for="classroom_savings">Savings Enabled</label><br /> */}
        <input type="submit" value="Create Classroom" />
      </fieldset>
    </form>
  );
}
