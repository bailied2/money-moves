export default function AddJob() {
  return (
    <form className="add_job_form" action="">
      <fieldset>
        <legend>Add Job</legend>
        <label>
          Classroom ID:
          <input type="text" id="add_job_classroom" name="add_job_classroom" />
        </label>
        <br />
        <label>
          Job Title:
          <input type="text" id="add_job_title" name="add_job_title" />
        </label>
        <br />
        <label>
          Job Description:
          <br />
          <textarea
            id="add_job_title"
            name="add_job_title"
            rows="4"
            cols="33"
          ></textarea>
        </label>
        <br />
        <label>
          Wage:
          <input
            type="number"
            id="job_wage"
            name="job_wage"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Pay Frequency:
          <select id="job_pay_frequency" name="job_pay_frequency">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <br />
        <label>
          Pay Day:
          <select id="job_pay_day" name="job_pay_day">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>{" "}
        </label>
        <br />
        <label>
          Icon ID:
          <input
            type="number"
            id="job_wage"
            name="job_wage"
            min="0"
            max="12"
          />{" "}
        </label>
        <br />
        <input type="checkbox" id="job_trustee" name="job_trustee" />
        <label for="job_trustee">Trustee</label>
        <br />
        <input type="submit" value="Add Job" />
      </fieldset>
    </form>
  );
}
