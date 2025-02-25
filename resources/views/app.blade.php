@inject('headers', 'Bepsvpt\SecureHeaders\SecureHeaders')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
  <meta name="description" content="Knowii is a place for your community's Knowledge, Ideas and Inspiration." />
  <meta name="robots" content="index,follow,max-image-preview:large" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
    rel="stylesheet"
  />

  <script
    defer
    data-domain="knowii.net"
    data-api="https://blue-bar-dsebastien-19fd.developassion.workers.dev/api/v1/event"
    src="https://blue-bar-dsebastien-19fd.developassion.workers.dev/content/script.js"
    nonce="{{ csp_nonce('script') }}"
  ></script>

  <link href="/icons/favicon.ico" rel="shortcut icon" />

  <meta name="theme-color" content="#ffffff" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <!-- Safari Pinned Tab Icon: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/pinnedTabs/pinnedTabs.html -->
  <link color="#37404c" href="/icons/favicon.svg" rel="mask-icon" />

  <script id="site-microdata-script" type="application/ld+json" nonce="{{ csp_nonce('script') }}">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Knowii",
      "alternateName": "Knowii",
      "description": "Where all communities belong. A place for your Knowledge, your Ideas and Inspiration.",
      "publisher": {
        "@context": "https://schema.org/",
        "@type": "Person",
        "name": "Sébastien Dubois",
        "familyName": "Dubois",
        "givenName": "Sébastien",
        "image": "https://www.dsebastien.net/content/images/size/w2000/2024/04/Seb-2022.jpg",
        "url": "https://x.com/dSebastien",
        "sameAs": [
          "https://www.linkedin.com/in/sebastiend/",
          "https://github.com/dsebastien",
          "https://dsebastien.medium.com/",
          "https://dev.to/dsebastien",
          "https://www.youtube.com/channel/UCz0x-VJhvKwV-PK3E_i5G1w",
          "https://www.twitch.tv/dsebastien",
          "https://stackoverflow.com/users/226630/dsebastien",
          "https://www.facebook.com/trankill",
          "https://dsebastien.hashnode.dev/",
          "https://updates.dsebastien.net/",
          "https://www.reddit.com/user/lechtitseb/"
        ],
        "jobTitle": "Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "DeveloPassion",
          "url": "https://developassion.be"
        }
      },
      "url": "https://www.knowii.net"
    }
  </script>

  <!-- TODO add manifests -->
  <!--  <link href="/static/site.webmanifest" rel="manifest" />-->
  <!--  <meta content="/browserconfig.xml" name="msapplication-config" />-->

  <title inertia>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  @routes(nonce: csp_nonce('script'))
  @viteReactRefresh

  {{
  // WARNING: All paths below are relative to the root /public folder
  // Reference: https://laravel.com/api/11.x/Illuminate/Support/Facades/Vite.html
  Vite::useManifestFilename('.vite/manifest.json')
  ->withEntryPoints(["apps/knowii/src/main.tsx","apps/knowii/src/Pages/{$page['component']}.tsx"])
  }}

  @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
</html>
