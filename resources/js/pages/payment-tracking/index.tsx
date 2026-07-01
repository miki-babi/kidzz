import { Head } from '@inertiajs/react';

interface Tracking {
    id: number;
    user_id: number;
    plan_type: 'free' | 'premium';
    is_active: boolean;
    payment_reference: string | null;
    starts_at: string | null;
    expires_at: string | null;
}

interface Props {
    trackings: Tracking[];
}

export default function PaymentTrackingIndex({ trackings }: Props) {
    return (
        <>
            <Head title="Payment Tracking" />

            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Payment Tracking
                </h1>
                <p className="mt-2 text-sm font-medium text-neutral-500">
                    Current plan status for free and premium accounts.
                </p>

                <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <table className="min-w-full divide-y divide-neutral-100 dark:divide-zinc-800">
                        <thead className="bg-neutral-50 dark:bg-zinc-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-black tracking-widest text-neutral-500 uppercase">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black tracking-widest text-neutral-500 uppercase">
                                    Plan
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black tracking-widest text-neutral-500 uppercase">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-black tracking-widest text-neutral-500 uppercase">
                                    Reference
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
                            {trackings.map((tracking) => (
                                <tr key={tracking.id}>
                                    <td className="px-4 py-3 text-sm font-semibold text-neutral-800 dark:text-zinc-200">
                                        #{tracking.user_id}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-neutral-800 capitalize dark:text-zinc-200">
                                        {tracking.plan_type}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-neutral-800 dark:text-zinc-200">
                                        {tracking.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-neutral-500">
                                        {tracking.payment_reference ?? '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
