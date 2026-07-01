<?php

use App\Models\Skill;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            DB::table('games')
                ->where('id', $game->id)
                ->update([
                    'difficulty' => json_encode($this->convertKeyValueField($game->difficulty)),
                    'age_range' => json_encode($this->convertKeyValueField($game->age_range)),
                    'target_skills' => json_encode($this->convertTargetSkillsField($game->target_skills)),
                    'skill_awards' => json_encode($this->convertSkillAwardsField($game->skill_awards)),
                    'sensory_characteristics' => json_encode($this->convertKeyValueField($game->sensory_characteristics)),
                    'gameplay' => json_encode($this->convertKeyValueField($game->gameplay)),
                ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('games')->orderBy('id')->get()->each(function (object $game): void {
            DB::table('games')
                ->where('id', $game->id)
                ->update([
                    'difficulty' => json_encode($this->revertKeyValueField($game->difficulty)),
                    'age_range' => json_encode($this->revertKeyValueField($game->age_range)),
                    'target_skills' => json_encode($this->revertTargetSkillsField($game->target_skills)),
                    'skill_awards' => json_encode($this->revertSkillAwardsField($game->skill_awards)),
                    'sensory_characteristics' => json_encode($this->revertKeyValueField($game->sensory_characteristics)),
                    'gameplay' => json_encode($this->revertKeyValueField($game->gameplay)),
                ]);
        });
    }

    /**
     * @return list<array{key: string, value: string|null}>
     */
    private function convertKeyValueField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (array_is_list($data) && isset($data[0]['key'])) {
            return $data;
        }

        $items = [];

        foreach ($data as $key => $value) {
            if (! is_string($key)) {
                continue;
            }

            $items[] = [
                'key' => $key,
                'value' => is_scalar($value) ? (string) $value : null,
            ];
        }

        return $items;
    }

    /**
     * @return array<string, string|null>
     */
    private function revertKeyValueField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (! array_is_list($data)) {
            return $data;
        }

        $items = [];

        foreach ($data as $item) {
            if (! is_array($item) || ! isset($item['key'])) {
                continue;
            }

            $items[$item['key']] = $item['value'] ?? null;
        }

        return $items;
    }

    /**
     * @return list<array{skill_id: int, score_range: string}>
     */
    private function convertTargetSkillsField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (array_is_list($data) && isset($data[0]['skill_id'])) {
            return $data;
        }

        $items = [];

        foreach ($data as $key => $value) {
            if (! is_string($key) || ! is_scalar($value)) {
                continue;
            }

            $skillId = Skill::query()->where('slug', $key)->value('id');

            if ($skillId === null) {
                continue;
            }

            $items[] = [
                'skill_id' => (int) $skillId,
                'score_range' => (string) $value,
            ];
        }

        return $items;
    }

    /**
     * @return array<string, string>
     */
    private function revertTargetSkillsField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (! array_is_list($data)) {
            return $data;
        }

        $items = [];

        foreach ($data as $item) {
            if (! is_array($item) || ! isset($item['skill_id'])) {
                continue;
            }

            $slug = Skill::query()->whereKey($item['skill_id'])->value('slug');

            if ($slug === null) {
                continue;
            }

            $items[$slug] = (string) ($item['score_range'] ?? '');
        }

        return $items;
    }

    /**
     * @return list<array{skill_id: int, award: int|string}>
     */
    private function convertSkillAwardsField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (array_is_list($data) && isset($data[0]['skill_id'])) {
            return $data;
        }

        $items = [];

        foreach ($data as $key => $value) {
            if (! is_string($key) || ! is_scalar($value)) {
                continue;
            }

            $skillId = Skill::query()->where('slug', $key)->value('id');

            if ($skillId === null) {
                continue;
            }

            $items[] = [
                'skill_id' => (int) $skillId,
                'award' => $value,
            ];
        }

        return $items;
    }

    /**
     * @return array<string, int|string>
     */
    private function revertSkillAwardsField(?string $json): array
    {
        if ($json === null) {
            return [];
        }

        $data = json_decode($json, true);

        if (! is_array($data) || $data === []) {
            return [];
        }

        if (! array_is_list($data)) {
            return $data;
        }

        $items = [];

        foreach ($data as $item) {
            if (! is_array($item) || ! isset($item['skill_id'])) {
                continue;
            }

            $slug = Skill::query()->whereKey($item['skill_id'])->value('slug');

            if ($slug === null) {
                continue;
            }

            $items[$slug] = $item['award'] ?? 0;
        }

        return $items;
    }
};
