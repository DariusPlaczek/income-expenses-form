import React from 'react';
import { useForm } from "react-hook-form";

export function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
      })}
    </form>
  );
}

export function Input( { register, name, ...rest } ) {
  return (
    <input name={name} ref={register} {...rest} />
  )
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select name={name} ref={register({ required: true })} {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export function Radio({ value, register, options, name, errors, ...rest}) {
  return (
    <>
  {options.map((values, keys) => (
    <div key={values} className="input-radio">
      <input type="radio" name={name} value={value[keys]} ref={register({ required: true })} {...rest} />
      <label>{values}</label>
    </div>
    ))}
    </>
  );
}