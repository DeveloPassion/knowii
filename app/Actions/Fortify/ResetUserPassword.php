<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
    use PasswordValidationRules;

    /**
     * Validate and reset the user's forgotten password.
     *
     * @param  array<string, string>  $input
     *
     * @throws ValidationException
     */
    public function reset(User $user, array $input): void
    {
        $validator = Validator::make($input, [
            'password' => $this->passwordRules(),
        ]);

        $validator->validate();

        /** @var array{password: string} $input */
        $input = $validator->validated();

        $user->forceFill([
            'password' => Hash::make($input['password']),
        ])->save();
    }
}
