const InputField = ({ name, label, onChange, type, value }) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputField;
