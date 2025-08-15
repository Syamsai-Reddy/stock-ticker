# 📈 Stock Ticker App

A simple React/Next.js app to search stocks and display NIFTY movers.

---

## 🚀 Features

- Search for stocks via the search bar.
- Display live NIFTY movers in a grid.
- Modular components for easy maintenance (`SearchBar`, `StockCard`).
- Tailwind CSS styling.

---

## 🛠 Tech Stack

- **Next.js / React** — UI framework
- **Tailwind CSS** — Styling
- **Custom API** — `getNiftyMovers` for fetching market data

---

## 📂 Project Structure

```
src/
├── lib/api.ts              # API integration & mock data
├── components/
│   ├── TickerBar.tsx       # Rolling ticker component
│   ├── StockSearch.tsx     # Smart search with autocomplete
│   ├── StockChart.tsx      # Interactive price charts
│   └── SEOHead.tsx         # Dynamic SEO management
├── pages/
│   ├── Index.tsx           # Landing page with search
│   └── StockDetail.tsx     # Dynamic stock details page
└── Design system enhanced in index.css & tailwind.config.ts
```

---

## 🏃 Walkthrough

1️⃣ **Clone the repository**

```bash
git clone https://github.com/your-username/stock-ticker-app.git
cd stock-ticker-app
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Set up environment variables**
Create `.env.local` in the root folder:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url
```

4️⃣ **Run the development server**

```bash
npm run dev
```

Now visit:  
[http://localhost:3000](http://localhost:3000) in your browser.

5️⃣ **Understand the flow**

- **HomePage** calls `getNiftyMovers()` from `lib/api.js`.
- `getNiftyMovers()` fetches the NIFTY movers list from your API.
- The list is rendered as `StockCard` components.
- `SearchBar` lets you search stocks by symbol/name.

6️⃣ **Handling API responses**
If `movers` is **not** an array, a fallback message is displayed:

```javascript
if (!Array.isArray(movers)) {
  return <p>Failed to load NIFTY movers.</p>;
}
```

7️⃣ **Build for production**

```bash
npm run build
npm start
```

---

## 📸 Example Output

| Search Bar                     | NIFTY Movers                |
| ------------------------------ | --------------------------- |
| User can search for "RELIANCE" | Displays top movers in grid |

---

## 🐛 Troubleshooting

- **`movers.map is not a function`**  
  → Check if `getNiftyMovers()` is returning an array.  
  → Log the API response:
  ```javascript
  console.log(movers);
  ```
