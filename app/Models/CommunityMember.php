<?php

namespace App\Models;

use App\Enums\KnowiiCommunityMemberRole;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Parables\Cuid\GeneratesCuid;

/**
 * App\Models\CommunityMember
 *
 * @property int $id
 * @property string $cuid
 * @property int $community_id
 * @property int $user_id
 * @property KnowiiCommunityMemberRole $role
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereCommunityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereCuid($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommunityMember whereUserId($value)
 *
 * @mixin \Eloquent
 */
class CommunityMember extends Pivot
{
    // Automatically generate cuid2 for the model
    // Reference: https://github.com/Parables/laravel-cuid2
    use GeneratesCuid;

    /**
     * The table associated with the pivot model.
     *
     * @var string
     */
    protected $table = 'community_members';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'id',
        'community_id',
        'user_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    final public function casts(): array
    {
        return [
            'role' => KnowiiCommunityMemberRole::class,
        ];
    }

    final public function getRouteKeyName(): string
    {
        return 'cuid';
    }
}
