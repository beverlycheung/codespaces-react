import { useMemo, useState } from 'react';
import './App.css';

const events = [
  {
    id: 1,
    title: 'Clay & Chill',
    club: 'Ceramics Club',
    initials: 'CC',
    theme: 'Arts & culture',
    location: 'Student Union, Crimson View',
    time: '11:30 AM',
    date: 'Today',
    day: 'THU',
    number: '12',
    x: 43,
    y: 48,
    tone: 'rose',
  },
  {
    id: 2,
    title: 'Farmers Market',
    club: 'Sustainability Office',
    initials: 'SO',
    theme: 'Food & drink',
    location: 'Marriott Library Plaza',
    time: '12:00 PM',
    date: 'Today',
    day: 'THU',
    number: '12',
    x: 59,
    y: 35,
    tone: 'green',
  },
  {
    id: 3,
    title: 'Sunset Yoga',
    club: 'U RecWell',
    initials: 'UR',
    theme: 'Wellness',
    location: 'Union Lawn',
    time: '4:30 PM',
    date: 'Today',
    day: 'THU',
    number: '12',
    x: 34,
    y: 69,
    tone: 'purple',
  },
  {
    id: 4,
    title: 'Hack the U: Build Night',
    club: 'Women in Computing',
    initials: 'WC',
    theme: 'Tech & learning',
    location: 'Warnock Engineering Building',
    time: '6:00 PM',
    date: 'Tomorrow',
    day: 'FRI',
    number: '13',
    x: 71,
    y: 54,
    tone: 'blue',
  },
  {
    id: 5,
    title: 'Late Night at the Museum',
    club: 'Natural History Museum',
    initials: 'NH',
    theme: 'Arts & culture',
    location: 'Natural History Museum of Utah',
    time: '7:00 PM',
    date: 'Saturday',
    day: 'SAT',
    number: '14',
    x: 81,
    y: 25,
    tone: 'rose',
  },
];

const dateFilters = ['All events', 'Today', 'This week'];
const themes = ['All themes', 'Arts & culture', 'Food & drink', 'Wellness', 'Tech & learning'];

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function EventCard({ event, active, onClick }) {
  return (
    <button
      className={`event-card ${active ? 'is-selected' : ''}`}
      onClick={onClick}
      type="button"
      aria-pressed={active}
    >
      <span className={`event-avatar ${event.tone}`}>{event.initials}</span>
      <span className="event-copy">
        <span className="event-card-topline">
          <span className="event-club">{event.club}</span>
          <span className={`theme-dot ${event.tone}`} />
        </span>
        <span className="event-title">{event.title}</span>
        <span className="event-meta">
          <span>{event.time}</span>
          <span className="meta-divider">·</span>
          <span>{event.location}</span>
        </span>
        <span className="event-theme">{event.theme}</span>
      </span>
      <span className="event-arrow" aria-hidden="true">↗</span>
    </button>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [dateFilter, setDateFilter] = useState('All events');
  const [themeFilter, setThemeFilter] = useState('All themes');
  const [search, setSearch] = useState('');
  const [mobileListOpen, setMobileListOpen] = useState(true);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesDate =
        dateFilter === 'All events' ||
        (dateFilter === 'Today' && event.date === 'Today') ||
        dateFilter === 'This week';
      const matchesTheme = themeFilter === 'All themes' || event.theme === themeFilter;
      const matchesSearch =
        !query ||
        `${event.title} ${event.club} ${event.theme} ${event.location}`
          .toLowerCase()
          .includes(query);
      return matchesDate && matchesTheme && matchesSearch;
    });
  }, [dateFilter, search, themeFilter]);

  const selectedEvent = selectedId === null
    ? null
    : filteredEvents.find((event) => event.id === selectedId) || filteredEvents[0];

  function selectEvent(id) {
    setSelectedId(id);
    setMobileListOpen(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="U where home">
          <span className="brand-mark">U</span>
          <span className="brand-name">where</span>
        </a>
        <div className="topbar-center">
          <span className="campus-status"><span /> UNIVERSITY OF UTAH</span>
          <span className="topbar-divider" />
          <span className="topbar-date">THURSDAY, NOVEMBER 12</span>
        </div>
        <button className="submit-event" type="button" onClick={() => window.alert('Event submissions are coming soon!')}>
          <span>+</span> Submit an event
        </button>
      </header>

      <section className="workspace">
        <aside className={`event-panel ${mobileListOpen ? 'mobile-open' : ''}`}>
          <div className="panel-heading">
            <div className="eyebrow">YOUR CAMPUS, HAPPENING</div>
            <h1>Find your<br /><span>people & plans.</span></h1>
            <p className="panel-intro">The good stuff happening around the U, all in one place.</p>
          </div>

          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
            <input
              type="search"
              placeholder="Events, clubs, places..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search events, clubs, and places"
            />
            <kbd>⌘ K</kbd>
          </label>

          <div className="filter-row" aria-label="Filter by date">
            {dateFilters.map((filter) => (
              <button
                className={`filter-chip ${dateFilter === filter ? 'active' : ''}`}
                key={filter}
                onClick={() => setDateFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="list-heading">
            <h2>Happening around campus</h2>
            <span>{filteredEvents.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="theme-scroll" aria-label="Filter by theme">
            {themes.map((theme) => (
              <button
                className={`theme-filter ${themeFilter === theme ? 'active' : ''}`}
                key={theme}
                onClick={() => setThemeFilter(theme)}
                type="button"
              >
                {theme}
              </button>
            ))}
          </div>

          <div className="event-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  active={selectedEvent?.id === event.id}
                  event={event}
                  key={event.id}
                  onClick={() => selectEvent(event.id)}
                />
              ))
            ) : (
              <div className="empty-state">
                <span>Nothing on the map just yet.</span>
                <p>Try a different search or theme.</p>
              </div>
            )}
          </div>
          <div className="panel-footer">
            <span className="footer-spark">✳</span>
            <span>Made for U, by U.</span>
            <span className="footer-location">SALT LAKE CITY, UT</span>
          </div>
        </aside>

        <section className="map-panel" aria-label="University of Utah campus event map">
          <div className="map-toolbar">
            <div className="map-location">
              <span className="map-location-icon"><PinIcon /></span>
              <span><strong>University of Utah</strong><small>Salt Lake City, Utah</small></span>
            </div>
            <button className="map-layer-button" type="button" aria-label="Map view">
              <span className="layer-icon"><i /><i /><i /></span>
              <span>Map view</span>
              <span className="chevron">⌄</span>
            </button>
          </div>

          <div className="campus-map">
            <div className="map-grid" />
            <svg className="map-roads" viewBox="0 0 1000 760" preserveAspectRatio="none" aria-hidden="true">
              <path className="road-shadow" d="M-50 600 C190 550 190 420 385 420 S620 535 810 380 950 200 1080 220" />
              <path className="road" d="M-50 600 C190 550 190 420 385 420 S620 535 810 380 950 200 1080 220" />
              <path className="road-shadow" d="M245 -40 C220 135 360 180 345 320 S250 535 350 800" />
              <path className="road" d="M245 -40 C220 135 360 180 345 320 S250 535 350 800" />
              <path className="path-line" d="M-20 305 C160 345 300 260 440 305 S730 330 1020 255" />
              <path className="path-line" d="M500 -20 C455 150 570 255 540 385 S480 580 590 780" />
              <path className="path-line" d="M100 710 C250 585 450 650 620 565 S820 470 1030 535" />
            </svg>

            <div className="park park-one"><span>President&apos;s Circle</span></div>
            <div className="park park-two"><span>Fort Douglas</span></div>
            <div className="park park-three" />
            <div className="map-water" />
            <div className="map-building building-library"><span>MARRIOTT LIBRARY</span></div>
            <div className="map-building building-union"><span>UNIVERSITY UNION</span></div>
            <div className="map-building building-hospital"><span>HEALTH SCIENCES</span></div>
            <div className="map-building building-science"><span>ENGINEERING</span></div>
            <div className="map-building building-museum"><span>NHMU</span></div>
            <div className="map-building building-hall"><span>KINGSBURY HALL</span></div>
            <div className="map-building building-stadium"><span>RICE-ECCLES STADIUM</span></div>
            <div className="map-label label-campus">THE UNIVERSITY OF UTAH</div>
            <div className="map-label label-stadium-road">S CAMPUS DR</div>
            <div className="map-label label-central">NORTH CAMPUS DR</div>

            {filteredEvents.map((event) => (
              <button
                className={`map-pin ${event.tone} ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                key={event.id}
                style={{ left: `${event.x}%`, top: `${event.y}%` }}
                onClick={() => selectEvent(event.id)}
                type="button"
                aria-label={`${event.title}, ${event.club}, ${event.location}`}
                aria-pressed={selectedEvent?.id === event.id}
              >
                <span className="pin-number"><span>{event.number}</span></span>
                <span className="pin-stem" />
              </button>
            ))}

            {selectedEvent && (
              <div className="map-popover" style={{ left: `${selectedEvent.x}%`, top: `${selectedEvent.y}%` }}>
                <button className="popover-close" type="button" onClick={() => setSelectedId(null)} aria-label="Close event details">×</button>
                <div className="popover-time">{selectedEvent.day} · {selectedEvent.time}</div>
                <h3>{selectedEvent.title}</h3>
                <p>{selectedEvent.club}</p>
                <div className="popover-location"><PinIcon /> {selectedEvent.location}</div>
                <span className={`popover-theme ${selectedEvent.tone}`}>{selectedEvent.theme}</span>
              </div>
            )}

            <div className="map-credit">CAMPUS IS BETTER TOGETHER <span>✳</span></div>
          </div>

          <div className="map-legend">
            <span className="legend-count"><span /> {filteredEvents.length} events on the map</span>
            <span className="legend-date">NOVEMBER 12 — 14, 2026</span>
          </div>
          <button
            className={`mobile-list-toggle ${mobileListOpen ? 'panel-open' : ''}`}
            type="button"
            onClick={() => setMobileListOpen(!mobileListOpen)}
          >
            {mobileListOpen ? 'View map' : 'View events'}
          </button>
        </section>
      </section>
    </main>
  );
}

export default App;
