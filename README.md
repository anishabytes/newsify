# NEWSIFY

### India, reported without the noise.

Newsify is a responsive national news portal built with React, TypeScript, and Vite. It brings together live India headlines, state-specific coverage, source credits, live video, weather, and a public leadership directory in one editorial interface.

> A fast, source-conscious front end for exploring what is happening across India.

Live website : http://thenewsify.vercel.app

Create a production build with:

```powershell
npm run build
```

## What it does

| Area | Experience |
| --- | --- |
| Live desk | Pulls fresh headlines from public RSS sources and refreshes every 30 seconds. |
| State coverage | Browse news for each listed Indian state and region. Regional Google News RSS queries keep stories tied to the selected place. |
| Discovery | Filter by topic, region, or keyword. |
| Transparency | Shows the source name, original article link, and publication time for each story. |
| Watch | Embeds a playable India news live-stream search. |
| Save and share | Bookmark stories or share a headline directly from the story view. |
| Public record | Browse a leadership directory covering national and state-level figures. |

## Editorial flow

```text
Public RSS sources
	|
	v
Fetch -> clean -> classify -> assign region -> deduplicate
	|
	v
Newsify filters, story cards, source links, and live refresh
```

The app keeps the original article URL and source label attached to every live story. When a publisher does not provide an image, Newsify uses a topic-matched editorial image rather than an unrelated visual. If a feed is temporarily unavailable, a clearly labeled local briefing keeps each regional view usable.

## Project map

```text
src/
  App.tsx              Main newsroom, feed logic, filters, and story views
  style.css            Editorial theme, responsive layout, and components
  components/Footer.tsx
public/                Static public assets
server/                Server-side project space
tailwind.config.js     Design tokens and Tailwind configuration
```

## Important limitations

Newsify is currently a frontend-first project. Freshness depends on public RSS availability, browser networking, and the upstream publisher. RSS aggregation does not independently verify facts, and a production newsroom would still need a backend ingestion layer, monitoring, moderation, and editorial review before publication.

The interface is designed to stay functional during feed interruptions, but fallback briefings should not be treated as breaking news.

## Contact

Newsroom contact: `anishasubba783@gmail.com`
