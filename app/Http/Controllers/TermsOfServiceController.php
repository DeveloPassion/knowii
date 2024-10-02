<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Laravel\Jetstream\Jetstream;

class TermsOfServiceController extends Controller
{
  final public function show(): Response
  {
    // Fetch the privacy policy content from a file or database
    $policyContent = file_get_contents(Jetstream::localizedMarkdownPath('terms.md'));

    return Inertia::render('TermsOfService', [
      'terms' => $policyContent,
    ]);
  }
}