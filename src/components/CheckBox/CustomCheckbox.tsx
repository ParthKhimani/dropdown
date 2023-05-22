import React, { ChangeEvent } from 'react';

interface CustomCheckboxProps {
  label: string;
  value: string;
  validationErrorMessage?: string;
  className?: string;
  getData?: (data: {}) => void;
}

interface CustomCheckboxState {
  isChecked: boolean;
  isValid: boolean;
  data: {};
}

class CustomCheckbox extends React.Component<
  CustomCheckboxProps,
  CustomCheckboxState
> {
  constructor(props: CustomCheckboxProps) {
    super(props);

    this.state = {
      data: {},
      isChecked: false,
      isValid: true,
    };
  }

  handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    this.setState(
      {
        isChecked,
      },
      () => {
        if (this.state.isChecked) {
          if (this.props.getData) {
            this.props.getData({
              [this.props.value]: 'true',
            });
          }
        } else {
          if (this.props.getData) {
            this.props.getData({
              [this.props.value]: 'false',
            });
          }
        }
      },
    );
  };

  handleCheckboxBlur = () => {
    const { isChecked } = this.state;
    const isValid = isChecked;
    this.setState({
      isValid,
    });
  };

  render() {
    const { label, value, validationErrorMessage, className } = this.props;
    const { isChecked, isValid } = this.state;

    return (
      <>
        <label>
          <input
            type="checkbox"
            name={value}
            checked={isChecked}
            className={className}
            onChange={this.handleCheckboxChange}
            onBlur={this.handleCheckboxBlur}
          />
          {label}
        </label>
        {!isValid && <span className="error">{validationErrorMessage}</span>}
      </>
    );
  }
}

export default CustomCheckbox;
