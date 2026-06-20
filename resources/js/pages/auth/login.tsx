import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { LogIn } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Mascot speech bubble */}
                         {/* Mascot speech bubble */}
                        <div className="relative flex items-start gap-4 mb-2">
                            <img src="/asset/maskot/maskot_head.png" className="h-24 w-24 rounded-full flex items-center justify-center text-2xl shrink-0 float-duo" />
                            <div className="relative bg-white border-2 border-[#E5E5E5] rounded-[20px_20px_20px_4px] px-5 py-3 flex-1">
                                <p className="text-sm font-extrabold text-[#3C3C3C]">
                                    Welcome back!  🎉
                                </p>
                                {/* Speech bubble arrow */}
                                <div
                                    className="absolute -left-[9px] top-4 w-[14px] h-[14px] bg-white border-l-2 border-b-2 border-[#E5E5E5]"
                                    style={{
                                        transform: 'rotate(45deg)',
                                        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="font-extrabold text-sm text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    EMAIL ADDRESS
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="rounded-[12px] border-2 border-[#E5E5E5] px-4 py-4 text-sm font-semibold text-[#3C3C3C] bg-[#F7F7F7] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-[#1CB0F6] focus:bg-white transition-colors"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="font-extrabold text-sm text-[#AFB8C1] dark:text-zinc-400"
                                >
                                    PASSWORD
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Your password"
                                    className="rounded-[12px] border-2 border-[#E5E5E5] px-4 py-4 text-sm font-semibold text-[#3C3C3C] bg-[#F7F7F7] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 focus:border-[#1CB0F6] focus:bg-white transition-colors"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-1 text-xs font-bold text-[#FF4B4B] dark:text-red-400"
                                />
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-sm font-extrabold text-[#1CB0F6] hover:underline hover:underline-offset-2 dark:text-[#1CB0F6]"
                                        tabIndex={5}
                                    >
                                        Forgot your password?
                                    </TextLink>
                                )}
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-2 border-[#E5E5E5] data-[state=checked]:bg-[#58CC02] data-[state=checked]:border-[#58CC02] rounded-[4px]"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="font-extrabold text-sm text-[#3C3C3C] dark:text-zinc-300"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="btn-duo-green inline-flex items-center justify-center gap-2 w-full mt-2 px-8 py-4 text-base uppercase tracking-wide"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                <LogIn className="h-5 w-5" />
                                Log in
                            </Button>
                        </div>

                        {/* Divider + Toggle link inside card */}
                        <div className="border-t-2 border-[#E5E5E5] dark:border-zinc-700 pt-6 mt-2">
                            <p className="text-center text-sm font-bold text-[#777777] dark:text-zinc-400">
                                Don't have an account?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-extrabold text-[#1CB0F6] hover:underline hover:underline-offset-2 dark:text-[#1CB0F6]"
                                >
                                    Sign up
                                </TextLink>
                            </p>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-extrabold text-[#58CC02]">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: ' ',
    description: '',
};