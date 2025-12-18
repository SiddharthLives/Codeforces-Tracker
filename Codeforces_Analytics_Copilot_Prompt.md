
# Codeforces User Analytics Dashboard – Copilot Prompt

> **Purpose**  
This document is a **step-by-step Copilot prompt** to build a complete **Codeforces Analytics Web App**.  
Follow sections **in order**. Each section clearly explains **what to build, how to fetch data, and how to process it**.

---

## 1. Project Setup

### Ask Copilot:
> Create a React application using **Vite** with **JavaScript**.  
> Install and configure **Tailwind CSS** and **Chart.js**.

### Requirements:
- Use functional components
- Use hooks (`useState`, `useEffect`)
- Folder structure must be modular

### Install:
```bash
npm create vite@latest cf-analytics -- --template react
cd cf-analytics
npm install
npm install chart.js react-chartjs-2
npm install axios
```

---

## 2. Codeforces API Utility

### Ask Copilot:
> Create a utility file `src/utils/api.js` to handle all Codeforces API calls.

### Must include:
- `getUserInfo(handle)` → user.info
- `getUserRating(handle)` → user.rating
- `getUserSubmissions(handle)` → user.status
- `getContestList()` → contest.list
- `getContestStandings(contestId, handle)` → contest.standings

### Notes:
- Use Axios
- Handle API failures gracefully
- Return only `result` from response

---

## 3. Handle Input + Colored Username

### Ask Copilot:
> Create a component that takes a Codeforces handle and displays the username with color based on rating.

### Logic:
1. Fetch user info using `user.info`
2. Extract:
   - `handle`
   - `rating`
   - `rank`
3. Assign color using rating ranges

### Rating → Color:
| Rating | Color |
|------|------|
| <1200 | Gray |
| 1200–1399 | Green |
| 1400–1599 | Cyan |
| 1600–1899 | Blue |
| 1900–2099 | Purple |
| 2100–2299 | Orange |
| 2300–2399 | Orange Red |
| ≥2400 | Red |

---

## 4. Pie Chart – Problem Tags Solved

### Ask Copilot:
> Create a pie chart showing solved problem tags in descending order.

### Data:
- Source: `user.status`
- Filter verdict = `"OK"`
- Count **unique problems**
- Group by `problem.tags`

### Chart:
- Chart.js Pie Chart
- Different color per tag
- Tooltip shows count and percentage

---

## 5. Bar Chart – Problems Solved by Rating

### Ask Copilot:
> Create a bar graph showing number of problems solved at each rating.

### Logic:
- Use accepted submissions only
- Group by `problem.rating`
- Ratings from 800 to 3500 (step 100)
- Count unique problems per rating

---

## 6. Submission Heatmap

### Ask Copilot:
> Create a GitHub-style heatmap showing daily submissions for the current year.

### Logic:
- Use `creationTimeSeconds`
- Convert UNIX timestamp to date
- Count submissions per day

### UI:
- SVG or grid layout
- Darker color = more submissions

---

## 7. Avg Time to Solve A & B in Div-2

### Ask Copilot:
> Compute average time to solve problems A and B in Div-2 contests.

### Steps:
1. Filter contests with "Div. 2" in name
2. Get contest start time
3. Find first AC submission for A and B
4. Compute time difference
5. Average over all contests

---

## 8. Rating Analytics

### Ask Copilot:
> Show peak rating, maximum rise, and maximum downfall.

### Data:
- Source: `user.rating`

### Calculations:
- Peak = max(newRating)
- Max Rise = max(newRating - oldRating)
- Max Drop = min(newRating - oldRating)

---

## 9. Contest Type Tabs

### Ask Copilot:
> Create clickable tabs for contest categories.

### Tabs:
```
Div1 | Div2 | Div3 | Div1+Div2 | Global | Educational
```

### On Click:
1. Filter contests from `contest.list`
2. Fetch problems via `contest.standings`
3. Match submissions

### Colors:
| Status | Color |
|------|------|
| Solved | Green |
| Wrong | Red |
| Not Attempted | Black |

---

## 10. UX & Error Handling

### Ask Copilot:
> Add proper loading states and error handling.

### Must include:
- Invalid handle message
- Loading spinner
- API rate-limit safety
- Cached responses

---

## 11. File Structure

```
src/
 ├── components/
 │   ├── HandleInput.jsx
 │   ├── UserHeader.jsx
 │   ├── TagPieChart.jsx
 │   ├── RatingBarChart.jsx
 │   ├── Heatmap.jsx
 │   ├── ContestTabs.jsx
 │   └── ContestProblems.jsx
 ├── utils/
 │   ├── api.js
 │   ├── analytics.js
 │   └── helpers.js
 ├── App.jsx
 └── main.jsx
```

---

## 12. Final Advice to Copilot

> Build the project incrementally.  
> Start with handle input → user info → charts → analytics → contest filtering.

---

**End of Prompt**
