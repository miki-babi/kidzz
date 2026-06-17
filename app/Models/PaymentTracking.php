<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentTracking extends Model
{
    protected $fillable = [
        'user_id',
        'plan_type',
        'is_active',
        'starts_at',
        'expires_at',
        'payment_reference',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'bool',
            'starts_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isPremium(): bool
    {
        return $this->plan_type === 'premium' && $this->is_active;
    }
}
