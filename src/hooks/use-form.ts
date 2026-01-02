import { useReducer, useCallback, useEffect, useRef } from "react";
import * as Yup from "yup";

interface UseFormProps<T extends object> {
  initialValues: T;
  onSubmit: (values: T) => void;
  enableReinitialize?: boolean;
  initialErrors?: FormErrors<T>;
  initialTouched?: FormTouched<T>;
  onReset?: (values: T) => void;
  validate?: (values: T) => FormErrors<T>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnMount?: boolean;
  validationSchema?: Yup.ObjectSchema<T>;
}

interface UseFormReturn<T extends object> {
  errors: FormErrors<T>;
  getFieldProps: <K extends keyof T>(name: K) => FieldProps<T, K>;
  handleBlur: (field: keyof T) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleReset: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  resetForm: (values?: Partial<T>) => void;
  setErrors: (errors: FormErrors<T>) => void;
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
  setFieldTouched: <K extends keyof T>(field: K, touched: boolean) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: (touched: FormTouched<T>, shouldValidate?: boolean) => Promise<void>;
  setValues: (values: Partial<T>, shouldValidate?: boolean) => Promise<void>;
  touched: FormTouched<T>;
  values: T;
}

type FormErrors<T extends object> = {
  [K in keyof T]?: string;
};

type FormTouched<T extends object> = {
  [K in keyof T]?: boolean;
};

type FieldProps<T extends object, K extends keyof T> = {
  name: K;
  value: T[K];
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: () => void;
};

type FormState<T extends object> = {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isSubmitting: boolean;
};

type FormAction<T extends object> =
  | { type: "SET_FIELD_VALUE"; field: keyof T; value: any }
  | { type: "SET_VALUES"; values: Partial<T> }
  | { type: "SET_FIELD_TOUCHED"; field: keyof T; touched: boolean }
  | { type: "SET_TOUCHED"; touched: FormTouched<T> }
  | { type: "SET_FIELD_ERROR"; field: keyof T; error: string }
  | { type: "SET_ERRORS"; errors: FormErrors<T> }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "RESET_FORM"; values: T; errors: FormErrors<T>; touched: FormTouched<T> }
  | { type: "REINITIALIZE"; values: T };

const createFormReducer = <T extends object>() => {
  return (state: FormState<T>, action: FormAction<T>): FormState<T> => {
    switch (action.type) {
      case "SET_FIELD_VALUE":
        return {
          ...state,
          values: { ...state.values, [action.field]: action.value },
        };
      case "SET_VALUES":
        return {
          ...state,
          values: { ...state.values, ...action.values },
        };
      case "SET_FIELD_TOUCHED":
        return {
          ...state,
          touched: { ...state.touched, [action.field]: action.touched },
        };
      case "SET_TOUCHED":
        return {
          ...state,
          touched: action.touched,
        };
      case "SET_FIELD_ERROR":
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.error },
        };
      case "SET_ERRORS":
        return {
          ...state,
          errors: action.errors,
        };
      case "SET_SUBMITTING":
        return {
          ...state,
          isSubmitting: action.isSubmitting,
        };
      case "RESET_FORM":
        return {
          values: action.values,
          errors: action.errors,
          touched: action.touched,
          isSubmitting: false,
        };
      case "REINITIALIZE":
        return {
          ...state,
          values: action.values,
        };
      default:
        return state;
    }
  };
};

export const useForm = <T extends object>({
  initialValues,
  onSubmit,
  enableReinitialize = false,
  initialErrors = {} as FormErrors<T>,
  initialTouched = {} as FormTouched<T>,
  onReset,
  validate,
  validateOnBlur = true,
  validateOnChange = true,
  validateOnMount = false,
  validationSchema,
}: UseFormProps<T>): UseFormReturn<T> => {
  const formReducer = createFormReducer<T>();
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: initialErrors,
    touched: initialTouched,
    isSubmitting: false,
  });

  const initialValuesRef = useRef(initialValues);

  useEffect(() => {
    if (enableReinitialize && initialValues !== initialValuesRef.current) {
      dispatch({ type: "REINITIALIZE", values: initialValues });
      initialValuesRef.current = initialValues;
    }
  }, [initialValues, enableReinitialize]);

  const runValidation = useCallback(
    (valuesToValidate: T): FormErrors<T> => {
      if (validate) {
        return validate(valuesToValidate);
      }
      if (validationSchema) {
        try {
          validationSchema.validateSync(valuesToValidate, { abortEarly: false });
          return {};
        } catch (err) {
          const validationErrors: FormErrors<T> = {};
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach((e) => {
              if (e.path) {
                validationErrors[e.path as keyof T] = e.message;
              }
            });
          }
          return validationErrors;
        }
      }
      return {};
    },
    [validate, validationSchema],
  );

  useEffect(() => {
    if (validateOnMount) {
      const validationErrors = runValidation(state.values);
      dispatch({ type: "SET_ERRORS", errors: validationErrors });
    }
  }, []);

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      dispatch({ type: "SET_FIELD_VALUE", field, value });

      if (validateOnChange) {
        const newValues = { ...state.values, [field]: value };
        const validationErrors = runValidation(newValues);
        dispatch({ type: "SET_ERRORS", errors: validationErrors });
      }
    },
    [validateOnChange, runValidation, state.values],
  );

  const setFieldTouched = useCallback(
    <K extends keyof T>(field: K, isTouched: boolean) => {
      dispatch({ type: "SET_FIELD_TOUCHED", field, touched: isTouched });

      if (validateOnBlur && isTouched) {
        const validationErrors = runValidation(state.values);
        dispatch({ type: "SET_ERRORS", errors: validationErrors });
      }
    },
    [validateOnBlur, runValidation, state.values],
  );

  const setFieldError = useCallback(<K extends keyof T>(field: K, error: string) => {
    dispatch({ type: "SET_FIELD_ERROR", field, error });
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<any>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;
      setFieldValue(name as keyof T, fieldValue);
    },
    [setFieldValue],
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setFieldTouched(field, true);
    },
    [setFieldTouched],
  );

  const setValues = useCallback(
    async (newValues: Partial<T>, shouldValidate = true) => {
      dispatch({ type: "SET_VALUES", values: newValues });

      if (shouldValidate) {
        const updated = { ...state.values, ...newValues };
        const validationErrors = runValidation(updated);
        dispatch({ type: "SET_ERRORS", errors: validationErrors });
      }
    },
    [runValidation, state.values],
  );

  const setTouched = useCallback(
    async (newTouched: FormTouched<T>, shouldValidate = true) => {
      dispatch({ type: "SET_TOUCHED", touched: newTouched });

      if (shouldValidate) {
        const validationErrors = runValidation(state.values);
        dispatch({ type: "SET_ERRORS", errors: validationErrors });
      }
    },
    [runValidation, state.values],
  );

  const setErrors = useCallback((newErrors: FormErrors<T>) => {
    dispatch({ type: "SET_ERRORS", errors: newErrors });
  }, []);

  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      const resetValues = newValues ? { ...initialValuesRef.current, ...newValues } : initialValuesRef.current;

      dispatch({
        type: "RESET_FORM",
        values: resetValues,
        errors: initialErrors,
        touched: initialTouched,
      });

      if (onReset) {
        onReset(resetValues);
      }
    },
    [initialErrors, initialTouched, onReset],
  );

  const handleReset = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = runValidation(state.values);
      dispatch({ type: "SET_ERRORS", errors: validationErrors });

      const touchedFields = Object.keys(state.values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as FormTouched<T>);
      dispatch({ type: "SET_TOUCHED", touched: touchedFields });

      if (Object.keys(validationErrors).length === 0) {
        dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
        onSubmit(state.values);
        dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
      }
    },
    [state.values, runValidation, onSubmit],
  );

  const getFieldProps = useCallback(
    <K extends keyof T>(name: K): FieldProps<T, K> => ({
      name,
      value: state.values[name],
      onChange: handleChange,
      onBlur: () => handleBlur(name),
    }),
    [state.values, handleChange, handleBlur],
  );

  const isValid = Object.keys(state.errors).length === 0;

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValues,
    setTouched,
    setErrors,
    resetForm,
    getFieldProps,
  };
};
