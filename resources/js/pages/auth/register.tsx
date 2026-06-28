import { Form, Head } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';
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
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Mascot speech bubble */}
                        <div className="relative mb-2 flex items-start gap-4">
                            <img
                                src="/asset/maskot/maskot_head.png"
                                className="flex h-24 w-24 shrink-0 float-duo items-center justify-center rounded-full text-2xl"
                            />
                            <div className="relative flex-1 rounded-[20px_20px_20px_4px] border-2 border-[#E5E5E5] bg-white px-5 py-3">
                                <p className="text-sm font-extrabold text-[#3C3C3C]">
                                    Welcome! Let's create account to get
                                    started. 🎉
                                </p>
                                {/* Speech bubble arrow */}
                                <div
                                    className="absolute top-4 -left-[9px] h-[14px] w-[14px] border-b-2 border-l-2 border-[#E5E5E5] bg-white"
                                    style={{
                                        transform: 'rotate(45deg)',
                                        clipPath:
                                            'polygon(0 0, 100% 0, 0 100%)',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-extrabold text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    FULL NAME
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Your full name"
                                    className="rounded-[12px] border-2 border-[#E5E5E5] bg-[#F7F7F7] px-4 py-4 text-sm font-semibold text-[#3C3C3C] transition-colors focus:border-[#1CB0F6] focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-extrabold text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    EMAIL ADDRESS
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="rounded-[12px] border-2 border-[#E5E5E5] bg-[#F7F7F7] px-4 py-4 text-sm font-semibold text-[#3C3C3C] transition-colors focus:border-[#1CB0F6] focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-extrabold text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    PASSWORD
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Create a password"
                                    passwordrules={passwordRules}
                                    className="rounded-[12px] border-2 border-[#E5E5E5] bg-[#F7F7F7] px-4 py-4 text-sm font-semibold text-[#3C3C3C] transition-colors focus:border-[#1CB0F6] focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-sm font-extrabold text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    CONFIRM PASSWORD
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                    passwordrules={passwordRules}
                                    className="rounded-[12px] border-2 border-[#E5E5E5] bg-[#F7F7F7] px-4 py-4 text-sm font-semibold text-[#3C3C3C] transition-colors focus:border-[#1CB0F6] focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="btn-duo-green mt-2 inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base tracking-wide uppercase"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                <Sparkles className="h-5 w-5" />
                                Create Account
                            </Button>
                        </div>

                        {/* Divider + Toggle link inside card */}
                        <div className="mt-2 border-t-2 border-[#E5E5E5] pt-6 dark:border-zinc-700">
                            <p className="text-center text-sm font-bold text-[#777777] dark:text-zinc-400">
                                Already have an account?{' '}
                                <TextLink
                                    href={login()}
                                    tabIndex={6}
                                    className="font-extrabold text-[#1CB0F6] hover:underline hover:underline-offset-2 dark:text-[#1CB0F6]"
                                >
                                    Log in
                                </TextLink>
                            </p>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: ' ',
    description: ' ',
};
