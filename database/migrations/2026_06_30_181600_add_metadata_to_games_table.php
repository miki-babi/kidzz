<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('status')->default('active')->after('imagePath');
            $table->json('difficulty')->nullable()->after('status');
            $table->json('age_range')->nullable()->after('difficulty');
            $table->json('target_skills')->nullable()->after('age_range');
            $table->json('skill_awards')->nullable()->after('target_skills');
            $table->json('learning_objectives')->nullable()->after('skill_awards');
            $table->string('communication_requirement')->nullable()->after('learning_objectives');
            $table->string('motor_requirement')->nullable()->after('communication_requirement');
            $table->json('sensory_characteristics')->nullable()->after('motor_requirement');
            $table->json('gameplay')->nullable()->after('sensory_characteristics');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'difficulty',
                'age_range',
                'target_skills',
                'skill_awards',
                'learning_objectives',
                'communication_requirement',
                'motor_requirement',
                'sensory_characteristics',
                'gameplay',
            ]);
        });
    }
};
