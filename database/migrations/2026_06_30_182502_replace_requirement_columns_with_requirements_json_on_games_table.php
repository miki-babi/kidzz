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
            $table->json('requirements')->nullable()->after('learning_objectives');
        });

        foreach (DB::table('games')->orderBy('id')->get() as $game) {
            $requirements = [];

            if ($game->communication_requirement !== null) {
                $requirements['communication_requirement'] = $game->communication_requirement;
            }

            if ($game->motor_requirement !== null) {
                $requirements['motor_requirement'] = $game->motor_requirement;
            }

            if ($requirements !== []) {
                DB::table('games')
                    ->where('id', $game->id)
                    ->update(['requirements' => json_encode($requirements)]);
            }
        }

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn([
                'communication_requirement',
                'motor_requirement',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('communication_requirement')->nullable()->after('learning_objectives');
            $table->string('motor_requirement')->nullable()->after('communication_requirement');
        });

        foreach (DB::table('games')->orderBy('id')->get() as $game) {
            if ($game->requirements === null) {
                continue;
            }

            $requirements = json_decode($game->requirements, true);

            if (! is_array($requirements)) {
                continue;
            }

            DB::table('games')
                ->where('id', $game->id)
                ->update([
                    'communication_requirement' => $requirements['communication_requirement'] ?? null,
                    'motor_requirement' => $requirements['motor_requirement'] ?? null,
                ]);
        }

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('requirements');
        });
    }
};
