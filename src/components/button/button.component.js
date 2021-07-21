import React from 'react';
import './button.component.scss';

const Button = React.forwardRef(({ className, disabled, ...props }, ref) => {
  return (
    <button className={className} disabled={disabled} ref={ref} {...props} />
  )
});

export default Button;