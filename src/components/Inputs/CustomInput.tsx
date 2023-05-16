import React, { ChangeEvent } from 'react';

import './CustomInput.css';

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  validationPattern?: RegExp;
  validationErrorMessage?: string;
}

interface CustomInputState {
  value: string;
  isValid: boolean;
}

class CustomInput extends React.Component<CustomInputProps, CustomInputState> {
  constructor(props: CustomInputProps) {
    super(props);

    this.state = {
      value: '',
      isValid: true,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({
      value,
    });
  };

  handleBlur = () => {
    const { value } = this.state;
    const { validationPattern } = this.props;

    let isValid = true;
    if (validationPattern) {
      isValid = validationPattern.test(value);
    }

    this.setState({
      isValid,
    });
  };

  render() {
    const { label, name, type, validationErrorMessage } = this.props;
    const { value, isValid } = this.state;

    return (
      <div>
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {!isValid && <p className="error">{validationErrorMessage}</p>}
      </div>
    );
  }
}

export default CustomInput;
