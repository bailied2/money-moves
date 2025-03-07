export default function AddJob() {
  return (
    <form className="add_fee_bonus_form" action="">
      <fieldset>
        <legend>Add Fee/Bonus</legend>
        <label>
          Fee/Bonus Title: {" "}
          <input
            type="text"
            id="add_fee_bonus_title"
            name="add_fee_bonus_title"
          />
        </label>
        <br />
        <label>
          Fee/Bonus Description:
          <br />
          <textarea
            id="add_fee_bonus_description"
            name="add_fee_bonus_description"
            rows="4"
            cols="33"
          ></textarea>
        </label>
        <br />
        <label>
          Amount: {" "}
          <input
            type="number"
            id="fee_bonus_amount"
            name="fee_bonus_amount"
            step="0.01"
            min="0"
            max="99999999.99"
          />{" "}
        </label>
        <br />
        <label>
          Icon ID: {" "}
          <input
            type="number"
            id="fee_bonus_icon_id"
            name="fee_bonus_icon_id"
            min="0"
            max="12"
          />{" "}
        </label>
        <br />
        <br />
        <input type="submit" value="Add Fee/Bonus" />
      </fieldset>
    </form>
  );
}
