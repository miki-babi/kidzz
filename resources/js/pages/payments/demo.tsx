import { Head, router } from '@inertiajs/react';
import { CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import LandingHeader from '@/components/landing-header';
import Footer from '@/components/footer';

interface Props {
    game?: {
        id: number;
        name: string;
        routePath: string;
        category: string | null;
    } | null;
    price: number;
}

export default function DemoPayment({ game, price }: Props) {
    const [form, setForm] = useState({
        cardholder_name: '',
        email: '',
        card_number: '',
        expiry: '',
        cvc: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log('[DemoPayment] page loaded', {
            game,
            price,
        });
    }, [game, price]);

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('[DemoPayment] submit clicked');
        console.log('[DemoPayment] submit payload snapshot', {
            route: '/pay',
            hasGameContext: Boolean(game),
            form,
        });
        setSubmitting(true);

        router.post('/pay', form, {
            preserveScroll: true,
            onStart: () => {
                console.log('[DemoPayment] inertia post started', { route: '/pay' });
            },
            onSuccess: () => {
                console.log('[DemoPayment] inertia post success, redirect expected', { route: '/pay' });
            },
            onError: (errors) => {
                console.log('[DemoPayment] inertia post validation error', errors);
            },
            onFinish: () => {
                console.log('[DemoPayment] inertia post finished');
                setSubmitting(false);
            },
        });
    };

    return (
        <>
            <Head title="Payment" />
            <div className="min-h-screen bg-[#FAFAFA] text-[#1b1b18] antialiased dark:bg-[#09090b] dark:text-[#f4f4f5]">
                <LandingHeader />

                <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                    <div className="rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-neutral-100 dark:bg-zinc-950 dark:ring-zinc-800">
                        <div className="space-y-4 rounded-[1.5rem] bg-gradient-to-br from-red-600 via-red-600 to-orange-500 p-6 text-white">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                                <Sparkles className="h-4 w-4" />
                                Checkout
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">
                                Pay {price.toFixed(2)} USD to unlock all premium games
                            </h1>
                            <p className="max-w-2xl text-sm leading-relaxed text-white/85">
                                This is a demo payment page for demo purposes. Filling out the form and submitting it will mark the account as paid and unlock every game.
                            </p>
                        </div>

                        <form onSubmit={submit} className="mt-8 grid gap-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-2">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-zinc-300">Cardholder name</span>
                                    <input
                                        required
                                        value={form.cardholder_name}
                                        onChange={(event) => setForm({ ...form, cardholder_name: event.target.value })}
                                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                </label>
                                <label className="grid gap-2">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-zinc-300">Email</span>
                                    <input
                                        required
                                        type="text"
                                        value={form.email}
                                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                </label>
                            </div>

                                <label className="grid gap-2">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-zinc-300">Card number</span>
                                    <input
                                        required
                                        type="text"
                                        value={form.card_number}
                                        onChange={(event) => setForm({ ...form, card_number: event.target.value })}
                                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                </label>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-2">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-zinc-300">Expiry</span>
                                    <input
                                        required
                                        placeholder="MM/YY"
                                        value={form.expiry}
                                        onChange={(event) => setForm({ ...form, expiry: event.target.value })}
                                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                </label>
                                <label className="grid gap-2">
                                    <span className="text-sm font-bold text-neutral-700 dark:text-zinc-300">CVC</span>
                                    <input
                                        required
                                        type="text"
                                        value={form.cvc}
                                        onChange={(event) => setForm({ ...form, cvc: event.target.value })}
                                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-3 rounded-3xl bg-neutral-50 p-4 dark:bg-zinc-900 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <CreditCard className="mt-0.5 h-5 w-5 text-red-600" />
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900 dark:text-white">Demo payment</p>
                                        <p className="text-xs text-neutral-500">No real charge is processed.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-bold text-neutral-900 dark:text-white">Unlock status</p>
                                        <p className="text-xs text-neutral-500">Submission marks the whole account as premium.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                onClick={() => {
                                    console.log('[DemoPayment] pay button clicked', {
                                        game,
                                        form,
                                    });
                                }}
                                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {submitting ? 'Processing...' : `Pay ${price.toFixed(2)} USD`}
                            </button>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
