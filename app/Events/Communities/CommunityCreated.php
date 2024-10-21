<?php

namespace App\Events\Communities;

use Illuminate\Queue\SerializesModels;

class CommunityCreated extends CommunityEvent
{
  use SerializesModels;

  /**
   * The event's broadcast name.
   *
   * @return string
   */
  final public function broadcastAs(): string
  {
    return 'community.created';
  }
}
