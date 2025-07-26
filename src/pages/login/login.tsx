import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userInfoSlice';
import { LoginUI } from '@ui-pages';
import { useForm } from '../../utils/hooks';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { form, handleChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState<Error | null>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) return;
    dispatch(loginUser(form))
      .unwrap()
      .catch((err) => setError(err));
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={form.email}
      onChange={handleChange}
      password={form.password}
      handleSubmit={handleSubmit}
    />
  );
};
