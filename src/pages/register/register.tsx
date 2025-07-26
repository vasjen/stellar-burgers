import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/userInfoSlice';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import { useForm } from '../../utils/hooks';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { form, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<Error | null>(null);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.userName || !form.email || !form.password) return;
    const registerUserData: TRegisterData = {
      email: form.email,
      name: form.userName,
      password: form.password
    };
    dispatch(registerUser(registerUserData))
      .unwrap()
      .catch((err) => setError(err));
  };

  return (
    <RegisterUI
      errorText={error?.message}
      email={form.email}
      userName={form.userName}
      password={form.password}
      onChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
