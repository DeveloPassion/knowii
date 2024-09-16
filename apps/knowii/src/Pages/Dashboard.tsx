import AppLayout from '@/Layouts/AppLayout';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Controller, useForm } from 'react-hook-form';

import InputError from '@/Components/InputError';
import CommunityBox from '@/Components/CommunityBox';
import {
  Community,
  communityVisibilityOptions,
  DEFAULT_TOAST_POSITION,
  knowiiApiClient,
  MIN_ACTION_TIME,
  NewCommunity,
  sleep,
} from '@knowii/common';
import CardGroup from '@/Components/CardGroup';
import InputLabel from '@/Components/InputLabel';
import { useImmer } from 'use-immer';
import { SelectButton } from 'primereact/selectbutton';

export default function Dashboard() {
  const toastRef = useRef<Toast | null>(null);

  const [loading, setLoading] = useState(false);
  const [creatingCommunity, setCreatingCommunity] = useState(false);

  const [communities, updateCommunities] = useImmer<Community[]>([]);

  const form = useForm<NewCommunity>({
    defaultValues: {
      name: '',
      description: '',
    },
    // Reference: https://daily.dev/blog/react-hook-form-errors-not-working-troubleshooting-tips
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const createCommunity = async () => {
    setCreatingCommunity(true);
    setLoading(true);

    const newCommunity: NewCommunity = {
      name: form.getValues().name,
      description: form.getValues().description,
      // New communities are public by default
      visibility: form.getValues().visibility ? form.getValues().visibility : 'public',
    };

    await sleep(MIN_ACTION_TIME);

    const response = await knowiiApiClient.createCommunity(newCommunity);

    if ('success' === response.type && !response.errors) {
      closeCreateCommunityModal();
      form.reset();
      toastRef.current?.show({
        severity: 'success',
        summary: 'Community created successfully',
      });

      if (response.data) {
        updateCommunities((draft) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          draft.push(response.data!);
        });
      }
    } else {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Failed to create the community',
        detail: response.message,
      });
    }

    setLoading(false);
  };

  const openCreateCommunityModal = () => {
    setCreatingCommunity(true);
  };

  const closeCreateCommunityModal = () => {
    setCreatingCommunity(false);
    form.reset();
  };

  return (
    <>
      <AppLayout title="Dashboard" pageTitle="Dashboard">
        <Toast position={DEFAULT_TOAST_POSITION} ref={toastRef} />
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-500 pb-2 block text-center sm:text-left">
          My Communities
        </h2>
        <CardGroup className="mt-4">
          {/* TODO add link to open the given community page. The link should use the slug */}
          {communities.map((item) => (
            <CommunityBox key={item.cuid} community={item} creationMode={false} link={`/communities/${item.cuid}`} />
          ))}
          <CommunityBox creationMode={true} clickHandler={openCreateCommunityModal} />
        </CardGroup>
      </AppLayout>
      <Dialog
        header="New community"
        closeOnEscape={true}
        visible={creatingCommunity}
        className="w-full sm:w-[75vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]"
        onHide={() => closeCreateCommunityModal()}
        footer={
          <>
            <Button severity="secondary" label="Cancel" onClick={closeCreateCommunityModal} />
            <Button onClick={createCommunity} label="Go ahead!" disabled={!form.formState.isValid || loading} className="ml-2" />
          </>
        }
      >
        {loading ? (
          <div className="flex flex-row justify-center items-center">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            <span>Provide the details of your new community.</span>
            <form>
              {/* Name */}
              <div className="mt-4 col-span-6 sm:col-span-4">
                <InputLabel htmlFor="name">Name</InputLabel>
                <div className="p-inputgroup mt-1">
                  <Controller
                    // Reference https://react-hook-form.com/get-started#IntegratingControlledInputs
                    // WARNING: The name below MUST match the name of the field in the form
                    // In this case it matches the NewCommunity "name" field
                    name="name"
                    control={form.control}
                    rules={{
                      required: 'Please choose a name for your new community',
                      validate: (value) =>
                        (value.trim().length >= 3 && value.trim().length <= 255) || 'The name must be between 3 and 255 characters',
                      // TODO add validation constraints
                      // Reference: https://github.com/knowii-oss/knowii/blob/588760bb5aee7328d35be597a1656ba983ba43f1/apps/knowii/pages/communities/create/index.tsx
                      // add regex pattern
                    }}
                    render={({ field }) => (
                      <InputText
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        {...field}
                        aria-invalid={form.formState.errors.name ? true : false}
                        autoComplete="name"
                        required
                        disabled={form.formState.isSubmitting || form.formState.isLoading}
                      />
                    )}
                  />
                </div>

                {form.formState.errors.name && <InputError className="mt-2" message={form.formState.errors.name.message} />}
              </div>
              {/* Description */}
              <div className="mt-4 col-span-6 sm:col-span-4">
                <InputLabel htmlFor="description">Description</InputLabel>
                <div className="p-inputgroup mt-1">
                  <InputTextarea
                    id="description"
                    className="mt-1 block w-full"
                    {...form.register('description', {
                      required: false,
                      maxLength: 255,
                    })}
                    aria-invalid={form.formState.errors.description ? true : false}
                    disabled={loading}
                  />
                </div>

                {/* Visibility */}
                <div className="mt-4">
                  <InputLabel htmlFor="visibility">Community visibility</InputLabel>
                  <div className="p-inputgroup mt-1">
                    <Controller
                      // Reference https://react-hook-form.com/get-started#IntegratingControlledInputs
                      // WARNING: The name below MUST match the name of the field in the form
                      // In this case it matches the NewCommunity "visibility" field
                      name="visibility"
                      control={form.control}
                      rules={{ required: 'Please select at least one visibility option' }}
                      render={({ field }) => (
                        <SelectButton
                          id="visibility"
                          className="mt-1 block"
                          options={communityVisibilityOptions}
                          optionLabel="name"
                          optionValue="visibility"
                          required
                          {...field}
                          aria-invalid={form.formState.errors.visibility ? true : false}
                          disabled={loading}
                        />
                      )}
                    />
                  </div>

                  {form.formState.errors.visibility && <InputError className="mt-2" message={form.formState.errors.visibility.message} />}
                </div>
              </div>
            </form>
          </>
        )}
      </Dialog>
    </>
  );
}
