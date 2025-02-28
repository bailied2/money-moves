export default function AddJob() {
  return (
    <form className="add_property_form" action="">
      <fieldset>
        <legend>Add Property</legend>
        <label>
          Classroom ID:
          <input
            type="text"
            id="add_property_classroom"
            name="add_property_classroom"
          />
        </label>
        <br />
        <label>
          Property Title:
          <input
            type="text"
            id="add_property_title"
            name="add_property_title"
          />
        </label>
        <br />
        <label>
          Property Description:
          <br />
          <textarea
            id="add_property_title"
            name="add_property_title"
            rows="4"
            cols="33"
          ></textarea>
        </label>
        <br />
        <label>
          Value:
          <input
            type="number"
            id="property_value"
            name="property_value"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Rent:
          <input
            type="number"
            id="property_rent"
            name="property_rent"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Maintenance:
          <input
            type="number"
            id="property_maintenance"
            name="property_maintenance"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Pay Frequency:
          <select id="property_pay_frequency" name="property_pay_frequency">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <br />
        <label>
          Pay Day:
          <select id="property_pay_day" name="property_pay_day">
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
            id="property_wage"
            name="property_wage"
            min="0"
            max="12"
          />{" "}
        </label>
        <br />
        <input type="submit" value="Add Property" />
      </fieldset>
    </form>
  );
}
