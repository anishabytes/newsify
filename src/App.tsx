import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Bell, Bookmark, Check, ChevronDown, CloudRain, Heart, Menu, Play, Search, Share2, ShieldCheck, Wind, X } from 'lucide-react'
import Footer from './components/Footer'

type Story = {
  category: string
  district: string
  title: string
  excerpt: string
  time: string
  image: string
  sourceUrl: string
  sourceName: string
  publishedAt: string
}

const districts = ['All India', 'Delhi', 'Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Bihar', 'Gujarat', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Rajasthan', 'Odisha', 'Madhya Pradesh', 'Punjab', 'Assam', 'Jharkhand', 'Haryana', 'Chhattisgarh', 'Jammu & Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Goa', 'Manipur', 'Sikkim', 'Tripura', 'Meghalaya', 'Nagaland']
const categories = ['All news', 'Breaking', 'Politics', 'Civic', 'Environment', 'Business', 'Education', 'Culture', 'Weather']
const liveStreamUrl = 'https://www.youtube.com/results?search_query=India+news+live'
const fallbackImage = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85'
const categoryImages: Record<string, string> = {
  Breaking: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=85',
  Politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=85',
  Civic: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
  Environment: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85',
  Business: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
  Education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
  Culture: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85',
  Weather: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=85',
}

const fallbackTopics = [
  { category: 'Politics', title: 'government and public policy remain in focus' },
  { category: 'Civic', title: 'transport, roads, and essential services are being reviewed' },
  { category: 'Environment', title: 'weather, water, and climate preparedness are being monitored' },
  { category: 'Business', title: 'local trade, jobs, and small businesses are shaping the conversation' },
  { category: 'Education', title: 'schools, universities, and student services are receiving attention' },
  { category: 'Culture', title: 'local culture, heritage, and community events are drawing interest' },
  { category: 'Weather', title: 'regional forecasts and public advisories are being tracked' },
]

const fallbackStories: Story[] = districts.slice(1).flatMap((state, stateIndex) =>
  fallbackTopics.map((topic, topicIndex) => ({
    category: topic.category,
    district: state,
    title: `${state}: ${topic.title}`,
    excerpt: `A regional briefing for ${state}, covering the latest developments, public response, and the issues affecting communities across the state.`,
    time: `${stateIndex + topicIndex + 1} min ago`,
    image: categoryImages[topic.category] ?? fallbackImage,
    sourceUrl: 'https://www.india.gov.in/',
    sourceName: 'India news desk',
    publishedAt: new Date(Date.now() - (stateIndex * fallbackTopics.length + topicIndex) * 60000).toISOString(),
  })),
)

type FeedSource = {
  name: string
  url: string
  district?: string
}

const officials = [
  { name: 'Narendra Modi', role: 'Prime Minister', location: 'Government of India', initials: 'NM' },
  { name: 'Amit Shah', role: 'Union Home Minister', location: 'Government of India', initials: 'AS' },
  { name: 'Nirmala Sitharaman', role: 'Finance Minister', location: 'Government of India', initials: 'NS' },
  { name: 'Rahul Gandhi', role: 'Leader of Opposition', location: 'Lok Sabha · India', initials: 'RG' },
  { name: 'Yogi Adityanath', role: 'Chief Minister', location: 'Uttar Pradesh', initials: 'YA' },
  { name: 'Mamata Banerjee', role: 'Chief Minister', location: 'West Bengal', initials: 'MB' },
  { name: 'M. K. Stalin', role: 'Chief Minister', location: 'Tamil Nadu', initials: 'MS' },
  { name: 'Pinarayi Vijayan', role: 'Chief Minister', location: 'Kerala', initials: 'PV' },
  { name: 'Shivraj Singh Chouhan', role: 'Former Chief Minister', location: 'Madhya Pradesh', initials: 'SC' },
  { name: 'Himanta Biswa Sarma', role: 'Chief Minister', location: 'Assam', initials: 'HS' },
  { name: 'Mohan Yadav', role: 'Chief Minister', location: 'Madhya Pradesh', initials: 'MY' },
  { name: 'N. Chandrababu Naidu', role: 'Chief Minister', location: 'Andhra Pradesh', initials: 'CN' },
]

const nationalFeedSources: FeedSource[] = [
  { name: 'NDTV India', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://feeds.feedburner.com/ndtvnews-india') },
  { name: 'The Hindu', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.thehindu.com/feeder/default.rss') },
  { name: 'India Today', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.indiatoday.in/rss/1206574.xml') },
  { name: 'Hindustan Times', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.hindustantimes.com/feeds/rss/india-news/rss.xml') },
  { name: 'Reuters India', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://feeds.feedburner.com/reuters/INtopNews') },
  { name: 'BBC News India', url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://feeds.bbci.co.uk/news/world/asia/india/rss.xml') },
]

const regionalFeedSources = districts.slice(1).map((state) => ({
  name: `${state} regional feed`,
  district: state,
  url: 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(
    `https://news.google.com/rss/search?q=${state}%20India&hl=en-IN&gl=IN&ceid=IN:en`,
  ),
}))

const feedSources = [...nationalFeedSources, ...regionalFeedSources]

const inferDistrict = (title: string, description: string) => {
  const text = `${title} ${description}`
  const found = districts.slice(1).find((district) => text.toLowerCase().includes(district.toLowerCase()))
  return found ?? 'Delhi'
}

const inferCategory = (title: string, description: string) => {
  const text = `${title} ${description}`.toLowerCase()
  if (text.includes('weather') || text.includes('rain') || text.includes('storm')) return 'Weather'
  if (text.includes('election') || text.includes('minister') || text.includes('government') || text.includes('policy')) return 'Politics'
  if (text.includes('business') || text.includes('market') || text.includes('trade') || text.includes('startup')) return 'Business'
  if (text.includes('school') || text.includes('college') || text.includes('education') || text.includes('student')) return 'Education'
  if (text.includes('forest') || text.includes('wildlife') || text.includes('climate') || text.includes('river')) return 'Environment'
  if (text.includes('culture') || text.includes('festival') || text.includes('heritage') || text.includes('art')) return 'Culture'
  if (text.includes('road') || text.includes('water') || text.includes('city') || text.includes('transport')) return 'Civic'
  return 'Breaking'
}

const cleanText = (value?: string) =>
  (value ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()

const formatRelativeTime = (publishedAt?: string) => {
  if (!publishedAt) return 'just now'

  const diffMinutes = Math.max(0, Math.round((Date.now() - new Date(publishedAt).getTime()) / 60000))
  if (diffMinutes < 60) return `${diffMinutes} min ago`

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} hr ago${diffHours > 1 ? 's' : ''}`

  const diffDays = Math.round(diffHours / 24)
  return `${diffDays} day ago${diffDays > 1 ? 's' : ''}`
}

const getStoryImage = (item: any, category: string) => {
  const candidates = [
    item?.thumbnail,
    item?.enclosure?.link,
    item?.media?.content?.[0]?.url,
    item?.media?.thumbnail?.[0]?.url,
    item?.image,
    item?.content?.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)?.[1],
    item?.description?.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)?.[1],
  ]

  return candidates.find(Boolean) ?? categoryImages[category] ?? fallbackImage
}

async function fetchLiveStories(): Promise<Story[]> {
  try {
    const feedResults = await Promise.all(
      feedSources.map(async (source) => {
        const response = await fetch(source.url)
        if (!response.ok) return []

        const payload = await response.json()
        const items = Array.isArray(payload?.items) ? payload.items : []

        return items.slice(0, 8).map((item: any, index: number) => {
          const title = cleanText(item.title) || `Fresh update ${index + 1}`
          const description = cleanText(item.description || item.content)
          const sourceUrl = item.link || 'https://www.google.com/'
          const publishedAt = item.pubDate || new Date().toISOString()

          const category = inferCategory(title, description)

          return {
            category,
            district: source.district ?? inferDistrict(title, description),
            title,
            excerpt: description || 'Read the full report from the credited source.',
            time: formatRelativeTime(publishedAt),
            image: getStoryImage(item, category),
            sourceUrl,
            sourceName: source.name,
            publishedAt,
          }
        })
      }),
    )

    const flatten = feedResults
      .flat()
      .filter((story) => story && story.title)
      .reduce<Map<string, Story>>((accumulator, story) => {
        const existing = accumulator.get(story.title)
        if (!existing || new Date(story.publishedAt).getTime() > new Date(existing.publishedAt).getTime()) {
          accumulator.set(story.title, story)
        }
        return accumulator
      }, new Map())

    const mergedStories = Array.from(flatten.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    return mergedStories.length > 0 ? mergedStories.slice(0, 24) : fallbackStories
  } catch {
    return fallbackStories
  }
}

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState('All India')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All news')
  const [searchTerm, setSearchTerm] = useState('')
  const [stories, setStories] = useState<Story[]>(fallbackStories)
  const [activeStory, setActiveStory] = useState<Story | null>(null)
  const [saved, setSaved] = useState<string[]>([])
  const [panel, setPanel] = useState<'notifications' | 'directory' | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStories = async () => {
    setIsRefreshing(true)
    const latestStories = await fetchLiveStories()
    setStories(latestStories)
    setIsRefreshing(false)
  }

  useEffect(() => {
    let isMounted = true

    const loadStories = async () => {
      const latestStories = await fetchLiveStories()
      if (isMounted) {
        setStories(latestStories)
        setIsRefreshing(false)
      }
    }

    void loadStories()
    const intervalId = window.setInterval(() => {
      void loadStories()
    }, 30 * 1000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  const fallbackForSelectedDistrict = useMemo(
    () =>
      selectedDistrict === 'All India'
        ? fallbackStories
        : fallbackStories.filter((story) => story.district === selectedDistrict),
    [selectedDistrict],
  )

  const visibleStories = useMemo(() => {
    const liveMatches = stories.filter(
      (story) =>
        (selectedDistrict === 'All India' || story.district === selectedDistrict) &&
        (activeCategory === 'All news' || story.category === activeCategory),
    )

    const candidates =
      searchTerm.trim()
        ? liveMatches.filter((story) => `${story.title} ${story.district} ${story.category}`.toLowerCase().includes(searchTerm.toLowerCase()))
        : liveMatches.length > 0
          ? liveMatches
          : fallbackForSelectedDistrict.filter(
              (story) => activeCategory === 'All news' || story.category === activeCategory,
            )

    return searchTerm.trim()
      ? candidates.filter((story) => `${story.title} ${story.district} ${story.category}`.toLowerCase().includes(searchTerm.toLowerCase()))
      : candidates
  }, [stories, selectedDistrict, activeCategory, searchTerm, fallbackForSelectedDistrict])

  const featuredStory = visibleStories[0] ?? fallbackForSelectedDistrict[0] ?? fallbackStories[0]
  const secondaryStoryList = visibleStories.slice(1, 4).length > 0 ? visibleStories.slice(1, 4) : fallbackForSelectedDistrict.slice(1, 4)

  const toggleSaved = (title: string) =>
    setSaved((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]))

  const shareStory = (title: string) => navigator.clipboard?.writeText(`${title} — Newsify`)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-top content-width">
          <button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20} /></button>
          <a className="wordmark" href="#top"><span>NEWS</span><strong>IFY</strong></a>
          <div className="dateline">Monday, 14 September 2026 <span>·</span> New Delhi</div>
          <div className="header-actions">
            <button className="text-button" onClick={() => void refreshStories()}>{isRefreshing ? 'Updating...' : 'Refresh'}</button>
            <button className="text-button" onClick={() => setSearchOpen(!searchOpen)}><Search size={17} /> Search</button>
            <button className="icon-button" aria-label="Notifications" onClick={() => setPanel(panel === 'notifications' ? null : 'notifications')}><Bell size={18} /></button>
          </div>
        </div>
        <nav className={`main-nav content-width ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a className="active" href="#latest">Latest</a>
          <a href="#districts">Districts</a>
          <a href="#live">Live video <span className="live-dot" /></a>
          <a href="#leadership">Leadership hub</a>
          <a href="#weather">Weather</a>
          <a href="#about">About</a>
        </nav>
      </header>

      {panel === 'notifications' && (
        <aside className="action-panel notification-panel">
          <button className="panel-close icon-button" aria-label="Close notifications" onClick={() => setPanel(null)}><X size={18} /></button>
          <p className="section-kicker">Your newsroom alerts</p>
          <h2>Notifications</h2>
          <div className="notification-item"><span className="live-dot" /><div><strong>Rain watch updated</strong><p>Upper Garhwal travel advisory refreshed 12 min ago.</p></div></div>
          <div className="notification-item"><Bell size={16} /><div><strong>Live feed refresh</strong><p>Headline list updates automatically every 10 minutes.</p></div></div>
        </aside>
      )}

      {searchOpen && (
        <div className="search-panel">
          <div className="content-width search-inner">
            <Search size={20} />
            <input autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search districts, people, topics..." aria-label="Search news" />
            <span className="search-count">{visibleStories.length} stories</span>
            <button className="icon-button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18} /></button>
          </div>
        </div>
      )}

      <main id="top">
        <section className="intro content-width">
          <div>
            <p className="eyebrow">India, reported without the noise</p>
            <h1>News that moves<br /><em>the country.</em></h1>
          </div>
          <p className="intro-copy">A national briefing across politics, policy, culture, economy, and everyday life — from capital corridors to regional communities.</p>
        </section>

        <section className="ticker" aria-label="Live weather ticker">
          <div className="content-width ticker-inner">
            <span className="ticker-label"><span className="live-dot" /> Live across India</span>
            <span className="ticker-story">Monsoon outlook shifts in the north; state agencies issue regional advisories</span>
            <span className="ticker-weather"><CloudRain size={16} /> 29° Delhi <b>·</b> 27° Mumbai</span>
          </div>
        </section>

        <section className="content-width district-toolbar" id="districts">
          <div>
            <p className="section-kicker">The national desk</p>
            <h2>All India, one view</h2>
            <p className="result-summary">{visibleStories.length} stories across India · auto-refreshing every 30 seconds</p>
          </div>
          <label className="select-wrap">
            <span className="sr-only">Choose district</span>
            <select value={selectedDistrict} onChange={(event) => setSelectedDistrict(event.target.value)}>
              {districts.map((district) => <option key={district}>{district}</option>)}
            </select>
            <ChevronDown size={16} />
          </label>
        </section>

        <section className="content-width category-tabs" aria-label="News categories">
          {categories.map((category) => <button className={activeCategory === category ? 'selected' : ''} key={category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </section>

        <section className="content-width story-grid" id="latest">
          <article className="feature-story" onClick={() => setActiveStory(featuredStory)}>
            <a className="story-image-link" href={featuredStory?.sourceUrl ?? 'https://uk.gov.in/'} target="_blank" rel="noreferrer">
              <img src={featuredStory?.image ?? fallbackStories[0].image} alt="" />
            </a>
            <div className="feature-overlay">
              <div className="story-meta">
                <span>{featuredStory?.category}</span>
                <span>{featuredStory?.district}</span>
              </div>
              <h2>
                <a href={featuredStory?.sourceUrl ?? 'https://uk.gov.in/'} target="_blank" rel="noreferrer">
                  {featuredStory?.title ?? 'Latest update'}
                </a>
              </h2>
              <p>{featuredStory?.excerpt}</p>
              <div className="story-footer">
                <span>{featuredStory?.time} · Source: {featuredStory?.sourceName}</span>
                <a className="circle-button" aria-label="Read story" href={featuredStory?.sourceUrl ?? 'https://uk.gov.in/'} target="_blank" rel="noreferrer"><ArrowUpRight size={18} /></a>
              </div>
            </div>
          </article>

          <div className="secondary-stories">
            {secondaryStoryList.map((story) => (
              <article className="secondary-story clickable" key={`${story.title}-${story.sourceName}`} onClick={() => setActiveStory(story)}>
                <a className="story-image-link" href={story.sourceUrl} target="_blank" rel="noreferrer">
                  <img src={story.image} alt="" />
                </a>
                <div>
                  <div className="story-meta dark">
                    <span>{story.category}</span>
                    <span>{story.district}</span>
                  </div>
                  <h3><a href={story.sourceUrl} target="_blank" rel="noreferrer">{story.title}</a></h3>
                  <p>{story.excerpt}</p>
                  <span className="story-time">{story.time} · {story.sourceName}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-width all-news" id="all-news">
          <div className="rail-heading">
            <div>
              <p className="section-kicker">The complete file</p>
              <h2>Every story from every state</h2>
            </div>
            <span className="feed-status"><span className="live-dot" /> Live feed</span>
          </div>
          <div className="news-table">
            {visibleStories.slice(4).map((story) => (
              <article className="news-row clickable" key={`${story.title}-${story.sourceName}`} onClick={() => setActiveStory(story)}>
                <a className="news-row-image" href={story.sourceUrl} target="_blank" rel="noreferrer">
                  <img src={story.image} alt="" />
                </a>
                <div className="news-row-copy">
                  <div className="story-meta dark">
                    <span>{story.category}</span>
                    <span>{story.district}</span>
                  </div>
                  <h3><a href={story.sourceUrl} target="_blank" rel="noreferrer">{story.title}</a></h3>
                  <p>{story.excerpt}</p>
                  <span className="story-time">{story.time} · {story.sourceName}</span>
                </div>
                <button className="icon-button" aria-label={`Save ${story.title}`} onClick={(event) => { event.stopPropagation(); toggleSaved(story.title) }}>
                  {saved.includes(story.title) ? <Check size={17} /> : <Bookmark size={17} />}
                </button>
              </article>
            ))}
          </div>
          {visibleStories.length === 0 && (
            <div className="empty-state">
              <h3>No stories in this view yet</h3>
              <p>Try another district or category. The newsroom is adding local reports all day.</p>
            </div>
          )}
        </section>

        <section className="content-width lower-grid">
          <div className="district-rail">
            <div className="rail-heading">
              <div>
                <p className="section-kicker">Browse by place</p>
                <h2>All India states & UTs</h2>
              </div>
              <a href="#districts">Choose a region <ArrowUpRight size={15} /></a>
            </div>
            <div className="district-list">
              {districts.slice(1).map((district, index) => (
                <button key={district} onClick={() => { setSelectedDistrict(district); document.getElementById('latest')?.scrollIntoView() }}>
                  <span className="district-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{district}</span>
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
          </div>

          <aside className="weather-card" id="weather">
            <div className="weather-top">
              <div>
                <p className="section-kicker">National weather watch</p>
                <h2>India today</h2>
              </div>
              <Wind size={22} />
            </div>
            <div className="temperature"><strong>29°</strong><span>Warm and partly cloudy<br />Delhi</span></div>
            <div className="weather-stats"><span><CloudRain size={15} /> 64% humidity</span><span><Wind size={15} /> 12 km/h wind</span></div>
            <a className="weather-link" href="#weather">See all regions <ArrowUpRight size={15} /></a>
          </aside>
        </section>

        <section className="content-width video-section" id="live">
          <div className="rail-heading">
            <div>
              <p className="section-kicker">Watch live</p>
              <h2>News in motion</h2>
            </div>
            <a href={liveStreamUrl} target="_blank" rel="noreferrer">All streams <ArrowUpRight size={15} /></a>
          </div>

          <div className="video-card">
            <div className="video-placeholder">
              <iframe
                src="https://www.youtube.com/embed?listType=search&list=India%20news%20live"
                title="India live stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <span className="live-badge"><span className="live-dot" /> LIVE NOW</span>
            </div>
            <div className="video-copy">
              <p className="section-kicker">India briefing</p>
              <h3>Live coverage: national headlines</h3>
              <p>Public video search streams are embedded directly so the page can play live India news coverage without a separate player.</p>
              <a className="watch-link" href={liveStreamUrl} target="_blank" rel="noreferrer"><Play size={15} fill="currentColor" /> Open live stream <ArrowUpRight size={15} /></a>
              <span className="verified"><ShieldCheck size={15} /> Public source</span>
            </div>
          </div>
        </section>

        <section className="content-width leadership" id="leadership">
          <div className="rail-heading">
            <div>
              <p className="section-kicker">Public record</p>
              <h2>Leadership hub</h2>
            </div>
            <button className="link-button" onClick={() => setPanel('directory')}>Explore directory <ArrowUpRight size={15} /></button>
          </div>
          <div className="official-grid">
            {officials.map((official) => (
              <article className="official-card" key={official.name}>
                <div className="official-avatar">{official.initials}</div>
                <div>
                  <h3>{official.name}</h3>
                  <p>{official.role}</p>
                  <span>{official.location}</span>
                </div>
                <button className="icon-button" aria-label={`Save ${official.name}`}><Heart size={17} /></button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {panel === 'directory' && (
        <div className="panel-backdrop" onClick={() => setPanel(null)}>
          <section className="action-panel directory-panel" onClick={(event) => event.stopPropagation()}>
            <button className="panel-close icon-button" aria-label="Close directory" onClick={() => setPanel(null)}><X size={18} /></button>
            <p className="section-kicker">Verified public record</p>
            <h2>Leadership directory</h2>
            <p>Browse public officials by role and constituency.</p>
            {officials.map((official) => (
              <button className="directory-entry" key={official.name}>
                <span className="official-avatar">{official.initials}</span>
                <span><strong>{official.name}</strong><small>{official.role} · {official.location}</small></span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </section>
        </div>
      )}

      {activeStory && (
        <div className="story-modal-backdrop" onClick={() => setActiveStory(null)}>
          <article className="story-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close icon-button" aria-label="Close story" onClick={() => setActiveStory(null)}><X size={20} /></button>
            <img src={activeStory.image} alt="" />
            <div className="modal-content">
              <div className="story-meta dark">
                <span>{activeStory.category}</span>
                <span>{activeStory.district}</span>
              </div>
              <h2>{activeStory.title}</h2>
              <p className="modal-lede">{activeStory.excerpt}</p>
              <p>Source: {activeStory.sourceName} · {new Date(activeStory.publishedAt).toLocaleString()}</p>
              <div className="modal-actions">
                <button className="subscribe-button" onClick={() => toggleSaved(activeStory.title)}>
                  {saved.includes(activeStory.title) ? <Check size={15} /> : <Bookmark size={15} />} {saved.includes(activeStory.title) ? 'Saved' : 'Save story'}
                </button>
                <button className="text-button" onClick={() => shareStory(activeStory.title)}><Share2 size={16} /> Share</button>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default App
