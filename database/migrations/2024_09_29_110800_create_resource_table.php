<?php

use App\Enums\KnowiiResourceLevel;
use App\Enums\KnowiiResourceType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resources', static function (Blueprint $table) {
            $table->id();
            $table->string('cuid')->unique()->index();
            $table->string('name')->index();
            $table->string('slug')->unique()->index();
            $table->text('description')->nullable();
            $table->text('excerpt')->nullable();
            $table->jsonb('keywords');
            $table->text('ai_summary')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamp('modified_at')->nullable()->index();
            $table->string('language', 5)->nullable();
            $table->text('url')->nullable()->unique()->index();
            $table->string('cover_image_url')->nullable();
            $table->string('cover_image_alt')->nullable();
            $table->longText('cover_image_base64')->nullable();
            $table->enum('type', KnowiiResourceType::toStringArray())->index();
            $table->enum('level', KnowiiResourceLevel::toStringArray())->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->integer('view_count')->default(0)->index();
            $table->integer('share_count')->default(0)->index();
            // When Knowii last captured the contents of the resource
            $table->timestamp('last_captured_at')->nullable()->index();
            $table->timestamp('last_checked_at')->nullable()->index();
            $table->integer('check_failures_count')->nullable()->default(0);
            $table->boolean('is_unavailable')->nullable()->default(false)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
