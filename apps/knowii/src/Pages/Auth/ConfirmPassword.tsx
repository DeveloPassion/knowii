import FooterGuest from '@/Components/FooterGuest';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import { useRoute } from 'ziggy-js';
import { EMAIL_PASSWORD_URL, PASSWORD_CONFIRM_URL } from '@knowii/common';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import { FaAt, FaLock } from 'react-icons/fa';
import { InputText } from 'primereact/inputtext';
import InputError from '@/Components/InputError';
import { Button } from 'primereact/button';
import classNames from 'classnames';

interface ConfirmPasswordFormData {
  password: string;
}

export default function ForgotPassword() {
  const route = useRoute();
  const form = useForm<ConfirmPasswordFormData>({
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    form.post(route(PASSWORD_CONFIRM_URL), {
      onFinish: () => form.reset(),
    });
  };

  return (
    <>
      <Head title="Confirm Password" />

      <AuthenticationCard>
        <div className="mb-4 text-sm text-gray-600">
          This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <form onSubmit={submit}>
          <div className="mt-4">
            <InputLabel htmlFor="password">Password</InputLabel>
            <div className="p-inputgroup mt-1">
              <span className="p-inputgroup-addon mt-1">
                <FaLock />
              </span>
              <InputText
                id="password"
                type="password"
                className="mt-1 block w-full p-inputtext-lg"
                value={form.data.password}
                onChange={(e) => form.setData('password', e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <InputError className="mt-2" message={form.errors.password} />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Button label="Confirm" className={classNames('ml-4', { 'opacity-25': form.processing })} disabled={form.processing} />
          </div>
        </form>
      </AuthenticationCard>
      <FooterGuest />
    </>
  );
}
