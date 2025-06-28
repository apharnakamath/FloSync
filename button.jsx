import React from 'react';
import PropTypes from 'prop-types';
import './button.css'; // Optional: if you have specific styles for Button

const Button = React.memo(({ onClick, children, className, disabled }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
});

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
  disabled: false,
};

export default Button; // Correct export

