import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="font-bold text-neutral-700 dark:text-zinc-300"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    className="rounded-xl border-neutral-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="font-bold text-neutral-700 dark:text-zinc-300"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="rounded-xl border-neutral-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="font-bold text-neutral-700 dark:text-zinc-300"
                                >
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    className="rounded-xl border-neutral-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="font-bold text-neutral-700 dark:text-zinc-300"
                                >
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    className="rounded-xl border-neutral-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full rounded-full bg-[#D2232A] font-extrabold tracking-tight text-white shadow-lg shadow-red-500/10 transition-all hover:scale-[1.02] hover:bg-red-700 active:scale-[0.98] dark:bg-[#B01E24] dark:hover:bg-red-700"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm font-medium text-neutral-500 dark:text-zinc-400">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-extrabold text-[#D2232A] hover:text-red-700 dark:text-[#B01E24] dark:hover:text-red-500"
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
