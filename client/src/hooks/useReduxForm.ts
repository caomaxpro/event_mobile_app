import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {setField, resetForm} from '@src/redux/formSlice';
import {ValidationResult} from '@src/utils/validatorUtils';

type ValidatorFunction = (value: string, ...args: any[]) => ValidationResult[];

interface FieldConfig {
  validator?: ValidatorFunction;
  validatorArgs?: any[];
  asyncValidator?: (
    value: string,
    ...args: any[]
  ) => Promise<ValidationResult[]>;
}

export const useReduxForm = (formId: string) => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form[formId] || {});

  const registerField = (fieldName: string, config?: FieldConfig) => {
    const field = formState[fieldName] || {value: '', touched: false};

    return {
      value: field.value,
      touched: field.touched,
      onChange: (value: string) => {
        dispatch(
          setField({
            formId,
            field: fieldName,
            value,
          }),
        );
      },
      validate: () => {
        if (!config?.validator) return [];
        return config.validator(field.value, ...(config.validatorArgs || []));
      },
    };
  };

  const handleSubmit = async (
    onSubmit: (data: Record<string, string>) => Promise<void>,
  ) => {
    const formData = Object.entries(formState).reduce((acc, [key, field]) => {
      acc[key] = field.value;
      return acc;
    }, {} as Record<string, string>);

    await onSubmit(formData);
  };

  const reset = useCallback(() => {
    dispatch(resetForm(formId));
  }, [dispatch, formId]);

  return {
    registerField,
    handleSubmit,
    reset,
    formState,
  };
};
