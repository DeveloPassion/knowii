<?php

namespace App\Http\Controllers\Inertia;

use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;
use Laravel\Jetstream\Jetstream;
use Laravel\Jetstream\RedirectsActions;
use App\Models\CommunityResourceCollection;

class CommunityResourceCollectionController extends Controller
{
    use RedirectsActions;

    /**
     * Show a resource collection.
     *
     * @param  Request  $request
     * @param  string $slug
     * @return Response
     */
    public function show(Request $request, string $communitySlug, string $resourceCollectionSlug): Response
    {
        $community = (new Community())->where('slug', $communitySlug)->firstOrFail();
        $resourceCollection = (new CommunityResourceCollection())->where('slug', $resourceCollectionSlug)->firstOrFail();

        Gate::authorize('view', $community);

        // WARNING: The props passed here must remain aligned with the props expected by the page
        return Jetstream::inertia()->render($request, 'ResourceCollections/Show', [
            // WARNING: The props passed here must remain aligned with the props expected by the page
            'community' => $community,
            'resourceCollection' => $resourceCollection,

            // WARNING: The props passed here must remain aligned with the props defined in community.schema.ts
            'permissions' => [
                'canUpdateCommunity' => Gate::check('update', $community),
                'canDeleteCommunity' => Gate::check('delete', $community),

                'canAddCommunityMembers' => Gate::check('addCommunityMember', $community),
                'canUpdateCommunityMembers' => Gate::check('updateCommunityMember', $community),
                'canRemoveCommunityMembers' => Gate::check('removeCommunityMember', $community),
                
                'canCreateResourceCollection' => Gate::check('createResourceCollection', $community),
                'canUpdateResourceCollection' => Gate::check('updateResourceCollection', $community),
                'canDeleteResourceCollection' => Gate::check('deleteResourceCollection', $community),

                'canCreateResource' => Gate::check('createResource', $community),
                'canUpdateResource' => Gate::check('updateResource', $community),
                'canDeleteResource' => Gate::check('deleteResource', $community),
            ],
        ]);
    }
}