import React, { Component } from 'react';

interface CustomRadioProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

class CustomRadio extends Component<CustomRadioProps> {
  handleChange = () => {
    const { value, onChange } = this.props;
    onChange(value);
  };

  render() {
    const { label, checked } = this.props;

    return (
      <label>
        <input type="radio" checked={checked} onChange={this.handleChange} />
        {label}
      </label>
    );
  }
}

export default CustomRadio;
