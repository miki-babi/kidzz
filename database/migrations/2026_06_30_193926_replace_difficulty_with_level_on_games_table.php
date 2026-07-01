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
            $table->unsignedTinyInteger('level')->default(1)->after('status');
        });

        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            $level = $this->extractLevelFromDifficulty($game->difficulty);

            DB::table('games')
                ->where('id', $game->id)
                ->update(['level' => $level]);
        });

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('difficulty');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->json('difficulty')->nullable()->after('status');
        });

        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            DB::table('games')
                ->where('id', $game->id)
                ->update([
                    'difficulty' => json_encode([
                        ['key' => 'level', 'value' => (string) $game->level],
                    ]),
                ]);
        });

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('level');
        });
    }

    private function extractLevelFromDifficulty(?string $json): int
    {
        if ($json === null) {
            return 1;
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return 1;
        }

        if (array_is_list($data)) {
            foreach ($data as $item) {
                if (! is_array($item) || ($item['key'] ?? null) !== 'level') {
                    continue;
                }

                $level = (int) ($item['value'] ?? 1);

                return $this->normalizeLevel($level);
            }

            return 1;
        }

        if (isset($data['level'])) {
            return $this->normalizeLevel((int) $data['level']);
        }

        return 1;
    }

    private function normalizeLevel(int $level): int
    {
        return match (true) {
            $level <= 1 => 1,
            $level >= 3 => 3,
            default => 2,
        };
    }
};
