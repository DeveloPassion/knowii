# TODO

- Carbon|null --> ?Carbon
- Add all fields for all models
- Add type for methods that return collections: @return Collection<Order>
- Use @property-read for relationships
- Use @property-read for id and cuid fields
- Test policies: https://laracasts.com/discuss/channels/laravel/testing-policies
- Add Settings screen for resource collections
- Implement delete community resource API
- Update knowii-api-client to handle delete resources
- React (WS event) on community page, resource collection page, resource page
- Community page & resource collection page & resource page
  - Listen to resource collection updated WS events
- Implement update community API
- Implement update community UI
- Dashboard page & Community page & resource collection page & resource page & community settings page
  - Listen to community updated event, and adapt UI accordingly (breadcrumb, etc)
- Add fillable fields to CommunityMember pivot model?
- Add reset button to createResourceDialog form
- If error while saving resource, CreateResourceDialog should stop the loading spinner
  - should be handled in knowii-api-client.ts
- CreateTextResource: reject urls pointing to files (audio, video, etc)
- TODO show both the community specific name/description and the resource generic one
- Implement ResourcePage page
- Test CreateResourceDialog within the resource collection screen, where the specific collection can directly be provided and ensure that the collection field is not displayed
- Add form validation to CreateResourceDialog
- Allow changing the level of a resource
- Allow changing the description of a resource
- Add community details link to the community homepage
  - Include base details for anyone to see if community is public or user is member
  - What to include?
  - More info and control if admin
  - More info and control if owner
  - RBAC
    - Member: can see
    - Moderator: can change content
    - Admin: can change community settings and manage members
    - Owner: Can change community type, manage billing, etc
    - Update the RBAC model
- Add community name availability check
- Show total resources count on resource card
- Select and show resource type icon on each resource card and on the resource details page
- Facts table for user profiles
  - Verified: boolean
- Request to join a community vs RBAC + add to features
  - What happens to created resources once a user does not have access to the community anymore?
- Community chat
- Community gallery
- Share content on social media
  - Publish right from Knowii
- Try to execute node from Laravel
  - https://laracasts.com/discuss/channels/laravel/how-to-run-nodejs-from-laravel-controller
  - https://www.npmjs.com/package/node-html-markdown?activeTab=code
  - https://github.com/mixmark-io/turndown
  - https://github.com/crosstype/node-html-markdown
- Add and configure the following plugins for ReactMarkdown: remark-gfm, remark-toc, remark-mdx, remark-frontmatter
- add "profile" to UserResource?

'availableRoles' => array_values(Jetstream::$roles),
'availablePermissions' => Jetstream::$permissions,
'defaultPermissions' => Jetstream::$defaultPermissions,

- Check out Locale package: https://github.com/macmotp/locale
- Switch to autocomplete for resource collection selection in CreateResourceDialog (might be many collections)
- Improve PHP Constants.php to use const string NAME = 'value';
  - Reference: https://php.watch/versions/8.3/typed-constants
