import React, { ChangeEvent } from 'react';

interface CustomCheckboxProps {
  label: string;
  name: string;
  validationErrorMessage?: string;
}

interface CustomCheckboxState {
  isChecked: boolean;
  isValid: boolean;
}

class CustomCheckbox extends React.Component<
  CustomCheckboxProps,
  CustomCheckboxState
> {
  constructor(props: CustomCheckboxProps) {
    super(props);

    this.state = {
      isChecked: false,
      isValid: true,
    };
  }

  handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    this.setState({
      isChecked,
    });
  };

  handleCheckboxBlur = () => {
    const { isChecked } = this.state;

    const isValid = isChecked;

    this.setState({
      isValid,
    });
  };

  render() {
    const { label, name, validationErrorMessage } = this.props;
    const { isChecked, isValid } = this.state;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            name={name}
            checked={isChecked}
            onChange={this.handleCheckboxChange}
            onBlur={this.handleCheckboxBlur}
          />
          {label}
        </label>
        {!isValid && <p className="error">{validationErrorMessage}</p>}
      </div>
    );
  }
}

export default CustomCheckbox;
