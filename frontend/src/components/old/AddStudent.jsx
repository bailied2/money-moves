// import "./styles/AddStudent.css";

export default function AddStudent() {
  return (
    <form className="add_student_form" action="">
      <fieldset>
        <legend>Add Student</legend>
        <label>
          Student First Name: {" "}
          <input type="text" id="add_student_fname" name="add_student_fname" />
        </label>
        <br />
        <label>
          Student Last Name: {" "}
          <input type="text" id="add_student_lname" name="add_student_lname" />
        </label>
        <br />
        <label>
          Student Email: {" "}
          <input type="email" id="add_student_email" name="add_student_email" />
        </label>
        <br />
        <br />
        <input type="submit" value="Add Student" />
      </fieldset>
    </form>
  );
}
