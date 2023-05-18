import React, { ChangeEvent } from 'react';

import './CustomInput.css';

interface CustomInputProps {
  label?: string;
  name: string;
  type: string;
  validationPattern?: RegExp;
  validationErrorMessage?: string;
  getData?: (data: {}) => void;
  className?: string;
  placeholder?: string;
}

interface CustomInputState {
  value: string;
  isValid: boolean;
  data: {};
}

class CustomInput extends React.Component<CustomInputProps, CustomInputState> {
  constructor(props: CustomInputProps) {
    super(props);

    this.state = {
      data: {},
      value: '',
      isValid: true,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let { validationPattern } = this.props;
    const { validationErrorMessage } = this.props;

    let isValid = true;

    if (validationErrorMessage) {
      if (!validationPattern) {
        if (this.props.type === 'email') {
          validationPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        }
        if (this.props.type === 'name') {
          validationPattern = /^[a-zA-Z ]+$/;
        }
        if (this.props.type === 'number') {
          validationPattern =
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
        }
        if (this.props.type === 'phone') {
          validationPattern =
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        }
      }
      if (validationPattern) {
        isValid = validationPattern.test(value);
      }
    }
    this.setState({ isValid }, () => {
      if (this.state.isValid) {
        if (this.props.getData) {
          this.props.getData({
            [name]: value,
            isValid: 'true',
          });
        }
      } else {
        if (this.props.getData) {
          this.props.getData({
            [name]: value,
            isValid: 'false',
          });
        }
      }
    });
  };

  render() {
    const {
      label,
      name,
      type,
      validationErrorMessage,
      className,
      placeholder,
    } = this.props;
    const { value, isValid } = this.state;

    return (
      <div>
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          className={className}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={placeholder}
        />
        {!isValid && <span className="error">{validationErrorMessage}</span>}
      </div>
    );
  }
}

export default CustomInput;
