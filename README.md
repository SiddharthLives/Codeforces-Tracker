# Codeforces Analytics Dashboard

A comprehensive web application to analyze Codeforces user performance and track progress.

## Features

- **User Profile**: Display username with color-coded rating
- **Problem Tag Analysis**: Pie chart showing distribution of solved problems by tags
- **Rating Distribution**: Bar chart of problems solved by difficulty rating
- **Submission Heatmap**: GitHub-style activity heatmap for the current year
- **Rating Analytics**: Peak rating, maximum rise, and maximum drop
- **Div-2 Performance**: Average time to solve problems A and B
- **Contest Analytics**: Filter contests by type (Div1, Div2, Div3, etc.) with color-coded problem status

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Chart.js & react-chartjs-2
- Axios
- Codeforces API

## Usage

1. Enter a Codeforces handle in the input field
2. Click "Analyze" to fetch and display analytics
3. Explore various charts and statistics
4. Use contest tabs to filter by contest type

## Project Structure

```
src/
├── components/
│   ├── HandleInput.jsx
│   ├── UserHeader.jsx
│   ├── TagPieChart.jsx
│   ├── RatingBarChart.jsx
│   ├── Heatmap.jsx
│   ├── ContestTabs.jsx
│   ├── ContestProblems.jsx
│   └── RatingAnalytics.jsx
├── utils/
│   ├── api.js
│   ├── analytics.js
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

## License

MIT
