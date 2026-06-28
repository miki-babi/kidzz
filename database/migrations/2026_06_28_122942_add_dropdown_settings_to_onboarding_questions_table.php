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
        Schema::table('onboarding_questions', function (Blueprint $table) {
            $table->string('placeholder')->nullable()->after('order');
            $table->foreignId('default_choice_id')
                ->nullable()
                ->after('placeholder')
                ->constrained('onboarding_question_choices')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('onboarding_questions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('default_choice_id');
            $table->dropColumn('placeholder');
        });
    }
};
