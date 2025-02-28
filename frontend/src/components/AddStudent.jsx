// import "./styles/AddStudent.css";

export default function AddStudent() {
  return (
    <form className="add_student_form" action="">
      <fieldset>
        <legend>Add Student</legend>
        <label>
          Classroom ID:
          <input
            type="text"
            id="add_student_classroom"
            name="add_student_classroom"
          />
        </label>
        <br />
        <label>
          Student Email:
          <input type="text" id="add_student_email" name="add_student_email" />
        </label>
        <br />
        <input type="submit" value="Add Student" />
      </fieldset>
    </form>
  );
}
