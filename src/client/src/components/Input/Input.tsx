import React, { CSSProperties, InputHTMLAttributes, ReactElement } from 'react';
import { useField } from 'formik';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  htmlFor: string;
  onChange: any;
  label?: string | ReactElement;
  labelColor?: string;
  textAlign?: string;
  type: string | any;
  placeholder?: string;
  name: string;
  focusColor?: string;
  id: string;
  style?: CSSProperties;
};

export const Input: React.FC<InputProps> = ({
  htmlFor,
  label,
  type,
  onChange,
  placeholder,
  labelColor,
  focusColor,
  textAlign,
  id,
  style,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`text-sm font-bold leading-7 ${textAlign} text-${labelColor}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={field.name}
        className={`${
          error &&
          'border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none'
        } block w-full max-w-full px-4 py-3 mb-4 border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none`}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        style={style}
      />
    </>
  );
};
