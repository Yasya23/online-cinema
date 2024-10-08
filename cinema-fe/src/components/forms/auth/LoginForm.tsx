'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/input/Input';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { loginSchema } from '@/utils';
import styles from './forms.module.scss';
import { LoginFormValues } from '@/types/interfaces/loginFormValues';
import Spinner from '@/components/spinner/Spinner';
import { useAuthStore } from '@/store/Store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getToken } from '@/helpers';
import Layout from './Layout';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  const token = getToken();
  const { userAuth, authenticate, isLoading, error } = useAuthStore(
    (state) => state
  );
  const [isErrorMessageShown, setIsErrorMessageShown] = useState(false);

  const onSubmit = (values: LoginFormValues) => {
    if (values) {
      authenticate(values, 'login');
      setIsErrorMessageShown(true);
    }
  };

  useEffect(() => {
    if (!error && userAuth && token) {
      router.push('/');
      toast.success('You are sign in');
      reset();
    }
  }, [userAuth, error, token]);

  const handleOnFocus = (entity: 'email' | 'password') => {
    setIsErrorMessageShown(false);
    trigger(entity);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...field}
              icon={AiOutlineMail}
              error={errors.email?.message}
              onFocus={() => handleOnFocus('email')}
              onBlur={() => trigger('email')}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...field}
              icon={AiOutlineLock}
              hasAbilityHideValue={true}
              error={errors.password?.message}
              onFocus={() => handleOnFocus('password')}
              onBlur={() => trigger('password')}
            />
          )}
        />
        <div className={styles.errorField}>
          {isLoading ? (
            <Spinner />
          ) : error && isErrorMessageShown ? (
            <p>{error}</p>
          ) : (
            ''
          )}
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          Log In
        </button>
      </form>
    </Layout>
  );
};

export default LoginForm;
