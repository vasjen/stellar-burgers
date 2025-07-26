import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  getUserData,
  updateUserData
} from '../../services/slices/userInfoSlice';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector(getUserData);
  const [formValue, setFormValue] = useState({
    name: userData!.user.name,
    email: userData!.user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData?.user.name || '',
      email: userData?.user.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== userData?.user.name ||
    formValue.email !== userData?.user.email ||
    !!formValue.password;

  const updateProfileForm = () => {
    setFormValue({
      name: userData!.user.name,
      email: userData!.user.email,
      password: ''
    });
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserData(formValue));
    updateProfileForm();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    updateProfileForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
