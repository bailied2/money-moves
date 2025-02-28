export default function AddJob() {
  return (
    <form className="add_job_form" action="">
      <fieldset>
        <legend>Add Job</legend>
        <label>
          Job Title: {" "}
          <input type="text" id="add_job_title" name="add_job_title" />
        </label>
        <br />
        <label>
          Job Description:
          <br />
          <textarea
            id="add_job_description"
            name="add_job_description"
            rows="4"
            cols="33"
          ></textarea>
        </label>
        <br />
        <label>
          Wage: {" "}
          <input
            type="number"
            id="add_job_wage"
            name="add_job_wage"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Pay Frequency: {" "}
          <select id="add_job_pay_frequency" name="add_job_pay_frequency">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <br />
        <label>
          Pay Day: {" "}
          <select id="add_job_pay_day" name="add_job_pay_day">
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
          Icon ID: {" "}
          <input
            type="number"
            id="add_job_icon_id"
            name="add_job_icon_id"
            min="0"
            max="12"
          />{" "}
        </label>
        <br />
        <input type="checkbox" id="add_job_is_trustee" name="add_job_is_trustee" />
        <label for="add_job_is_trustee">Trustee</label>
        <br />
        <br />
        <input type="submit" value="Add Job" />
      </fieldset>
    </form>
  );
}
