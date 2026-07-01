<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->unsignedTinyInteger('min_age')->nullable()->after('level');
            $table->unsignedTinyInteger('max_age')->nullable()->after('min_age');
        });

        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            [$minAge, $maxAge] = $this->extractAgeRange($game->age_range);

            DB::table('games')
                ->where('id', $game->id)
                ->update([
                    'min_age' => $minAge,
                    'max_age' => $maxAge,
                ]);
        });

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('age_range');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->json('age_range')->nullable()->after('level');
        });

        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            $ageRange = [];

            if ($game->min_age !== null) {
                $ageRange[] = ['key' => 'min_age', 'value' => (string) $game->min_age];
            }

            if ($game->max_age !== null) {
                $ageRange[] = ['key' => 'max_age', 'value' => (string) $game->max_age];
            }

            DB::table('games')
                ->where('id', $game->id)
                ->update(['age_range' => json_encode($ageRange)]);
        });

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn(['min_age', 'max_age']);
        });
    }

    /**
     * @return array{0: int|null, 1: int|null}
     */
    private function extractAgeRange(?string $json): array
    {
        if ($json === null) {
            return [null, null];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [null, null];
        }

        $minAge = null;
        $maxAge = null;

        if (array_is_list($data)) {
            foreach ($data as $item) {
                if (! is_array($item) || ! isset($item['key'])) {
                    continue;
                }

                if ($item['key'] === 'min_age') {
                    $minAge = $this->normalizeAge($item['value'] ?? null);
                }

                if ($item['key'] === 'max_age') {
                    $maxAge = $this->normalizeAge($item['value'] ?? null);
                }
            }

            return [$minAge, $maxAge];
        }

        if (isset($data['min_age'])) {
            $minAge = $this->normalizeAge($data['min_age']);
        }

        if (isset($data['max_age'])) {
            $maxAge = $this->normalizeAge($data['max_age']);
        }

        return [$minAge, $maxAge];
    }

    private function normalizeAge(mixed $value): ?int
    {
        if (! is_numeric($value)) {
            return null;
        }

        $age = (int) $value;

        return $age >= 0 ? $age : null;
    }
};
