import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaAt, FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa';
import { redirectPath, SIGN_IN_URL } from '@knowii/common';
import { useAuthRedirectUrl } from '@knowii/client';
import { AuthFormWrapper } from './auth-form-wrapper';
import { useTranslations } from 'next-intl';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SignupFormProps {}

export function SignupForm(_props: SignupFormProps) {
  const t = useTranslations('signupForm');
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const redirectTo = useAuthRedirectUrl();
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<{
    email: string;
    password: string;
    givenName: string;
    familyName: string;
    serverError?: void;
  }>();
  const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (e: FormEvent) => {
    clearErrors('serverError');
    handleSubmit(async ({ email, password, givenName, familyName }) => {
      const {
        data: { session, user: newUser },
        error,
      } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            // WARNING: Those kay names are very sensitive
            // They are used by the triggers defined in supabase-db-seed.sql
            given_name: givenName,
            family_name: familyName,
            full_name: `${givenName} ${familyName}`,
          },
          emailRedirectTo: redirectTo,
        },
      });

      if (error || !newUser) {
        setError('serverError', { message: error?.message });
        return;
      }

      // if email confirmations are enabled, the user will have to confirm their email before they can sign in
      // Reference: https://supabase.com/docs/reference/dart/auth-signup
      if (!session) {
        return;
      }

      // if email confirmations are disabled, the user will be signed in automatically and redirected
      await router.push(redirectPath);
    })(e);
  };

  const togglePassword = useCallback(() => setPasswordVisible(!isPasswordVisible), [isPasswordVisible]);

  return (
    <AuthFormWrapper
      title={t('title')}
      description={
        <>
          {`${t('description')} ${t('accountAlreadyExists')} `}
          <Link as={NextLink} href={SIGN_IN_URL} color="primary.500" display="inline-block">
            {t('signIn')} &rarr;
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={5}>
          {isSubmitted &&
            (isSubmitSuccessful ? (
              <Alert status="success" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('successMessage')}</AlertTitle>
              </Alert>
            ) : (
              <Alert status="error" rounded="lg">
                <AlertIcon />
                <AlertTitle>{t('errorMessage')}</AlertTitle>
              </Alert>
            ))}

          {(!isSubmitted || !isSubmitSuccessful) && (
            <>
              {/* Given Name field */}
              <FormControl>
                <FormLabel>{t('fields.givenName')}</FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.300">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    // Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                    autoComplete="given-name"
                    {...register('givenName', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              {/* Family Name field */}
              <FormControl>
                <FormLabel>{t('fields.familyName')}</FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.300">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    // Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                    autoComplete="family-name"
                    {...register('familyName', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              {/* Email field */}
              <FormControl>
                <FormLabel>{t('fields.email')}</FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.300">
                    <FaAt />
                  </InputLeftElement>

                  <Input
                    required
                    type="email"
                    // Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                    autoComplete="email"
                    {...register('email', { required: true })}
                  />
                </InputGroup>
              </FormControl>

              {/* Password field */}
              <FormControl>
                <FormLabel>{t('fields.password')}</FormLabel>
                <InputGroup>
                  <InputLeftElement color="gray.300">
                    <FaLock />
                  </InputLeftElement>
                  <Input
                    required
                    type={isPasswordVisible ? 'text' : 'password'}
                    // Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
                    autoComplete="new-password"
                    {...register('password', { required: true })}
                  />
                  <InputRightElement color="primary.500" as="button" type="button" onClick={togglePassword}>
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Submit button */}
              <Button colorScheme="primary" type="submit" isLoading={isSubmitting}>
                {t('submitButton')}
              </Button>
            </>
          )}
        </Stack>
      </form>
    </AuthFormWrapper>
  );
}

export default SignupForm;
