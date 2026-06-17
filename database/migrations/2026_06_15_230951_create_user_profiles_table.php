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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Basic information
            $table->integer('age')->nullable();
            $table->string('gender')->nullable();
            $table->string('evaluated_status')->nullable();

            // Communication
            $table->string('speech_level')->nullable();

            //developmental milestones
            $table->json('diagnosed_conditions')->nullable();


            // JSON columns for grouped data
            $table->json('speaking_skills')->nullable();
            $table->json('understanding_language')->nullable();
            $table->json('recognition_skills')->nullable();
            $table->json('understanding_concepts')->nullable();
            $table->json('thinking_skills')->nullable();
            $table->json('social_play_skills')->nullable();
            $table->json('interests')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
