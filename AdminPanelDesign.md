# Starcross Admin Panel Design System

## Core Aesthetics & Tone
The Starcross Admin Panel is built for absolute clarity, speed, and focus. It strips away the marketing-heavy elements of the main website in favor of a clean, utilitarian, data-dense interface designed for professional business management.

**Key Characteristics:**
- **Mode:** Forced Light Mode (default).
- **Layout:** High-density desktop and tablet layouts. Side panel starts collapsed by default to maximize screen real estate for data.
- **Focus:** Sharp contrasts, minimal use of color except for crucial data indicators, and highly legible data tables.

## Color Palette
- **Primary Data Accent (Amber):** `#e3a23b` (used for graphs, active states, and crucial buttons)
- **Background / Canvas:** `#ffffff` (Solid, clean backdrop for readability)
- **Surfaces:** `#f9fafb`, `#f3f4f6` (Used for sidebar, cards, and table headers to separate them from the main canvas)
- **Typography:** `#111827` (Primary numbers/text), `#6b7280` (Muted labels and auxiliary text)
- **Status Colors:**
  - Success/Active: Emerald Greens (`#10b981`)
  - Warning/Pending: Amber (`#f59e0b`)
  - Error: Rose Reds (`#f43f5e`)

## Typography
- **Primary Interface Font:** Plus Jakarta Sans (`var(--font-jakarta)`) for headers and general UI.
- **Data/Metrics Font:** Inter (`var(--font-inter)`) and Monospace formatting for strict numerical data (e.g., inquiry counts, timestamps).
- Tighter font sizing compared to the main website to allow more data density.

## Key Components
### 1. Dashboard Metrics & Trend Graphs
- **Metric Cards:** Display high-level stats (e.g., total inquiries). Minimal padding, prominent numbers, and small visual trend indicators.
- **Inquiry Volume Chart:**
  - Aspect Ratio: Optimized to take up minimal vertical height while stretching horizontally (`height: 160px`).
  - Data Markers: Interactive nodes with floating orange badges. Text inside badges uses contrasting dark color (`#03100e`) for perfect readability.
  - X/Y Axes: Reduced font sizes (`10px`) in muted grays to keep focus on the data line.

### 2. Admin Sidebar
- **State:** Defaults to **Collapsed (Closed)** to maintain maximum width for the dashboard views.
- **Interactivity:** Expands on interaction. Features notification badges (e.g., for new unseen bookings) integrated directly into the navigation icons.

### 3. Data Tables (Recent Bookings)
- Clean, bordered tables with strict column alignments.
- Subtle hover states on rows (`bg-gray-50`) to assist the eye without being distracting.
- Prominent status badges utilizing the defined Status Colors palette.

## Best Practices
- **Data First:** Avoid excessive padding. If an element doesn't provide data context, it shouldn't distract the eye.
- **Consistent Badging:** Always use standard border-radius and the established semantic colors (emerald, amber, rose) for all status indicators.
- **Feedback:** All asynchronous actions (saving, fetching) must include immediate visual feedback (e.g., `Spinner` component or button loading states).
