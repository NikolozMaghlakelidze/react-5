import { useState } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ handleSubmit, handleUpdate, userToEdit }) => {
  const [name, setSaxeli] = useState("");
  const [surname, setGvari] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAsaki] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);

  const validateInputs = () => {
    const errors = [];
    if (!name || name.length < 4) {
      errors.push("minimum 4 asoiani saxeli");
    }
    if (!surname || surname.length < 4) {
      errors.push("minimum otx asoiani gvari");
    }
    if (email && !email.match(/@gmail\.com$/)) {
      errors.push("araswori meili");
    }
    if (+age < 18) {
      errors.push("asaki minimum 18 weli");
    }
    if (!gender) {
      errors.push("aucilebelia archeva");
    }
    return errors;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (errors.length === 0) {
      if (userToEdit) {
        handleUpdate(userToEdit.id, { name, surname, email, age, gender });
        setErrors([]);
      } else {
        handleSubmit({ name, surname, email, age, gender });
        setErrors([]);
      }
      setSaxeli("");
      setGvari("");
      setEmail("");
      setAsaki("");
      setGender("");
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setSaxeli(e.target.value)}
      />
      <p />
      <label htmlFor="surname">Surname:</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(e) => setGvari(e.target.value)}
      />
      <p />
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p />
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        value={age}
        onChange={(e) => setAsaki(e.target.value)}
      />
      <p />
      <label htmlFor="gender">Gender:</label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select a gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>

  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  userToEdit: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default UserForm