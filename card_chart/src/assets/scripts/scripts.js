const chartPlotArea = document.querySelector('.chart__plot-area');

async function fetchData(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  return responseData;
}

function highlightDataPoint(category) {
  const dataPoint = document.querySelector(`[data-label="${category}"]`);
  dataPoint.parentElement.classList.add('highlight');
}

function getCurrentDay() {
  return new Date().toLocaleDateString('en-us', { weekday: 'short' });
}

function renderDataPoints([values, labels], plotArea) {
  plotArea.innerHTML = values
    .map((value, i) => {
      const height = value * 2.865;
      return `<div class="chart__data-point" style="height:${height}px">
        <div data-label="${labels[i]}" class="data-point__label">$${value}</div>
        </div>`;
    })
    .join('');
}

function renderHorizontalAxis(labels) {
  const chartHorizontalAxis = document.querySelector('.chart__horizontal-axis');
  chartHorizontalAxis.innerHTML = labels
    .map(label => `<div>${label}</div>`)
    .join('');
}

function renderChart(data) {
  const [categories, values] = data.reduce(
    (acc, { day, amount }) => {
      acc[0].push(day);
      acc[1].push(amount);
      return acc;
    },
    [[], []]
  );

  renderDataPoints([values, categories], chartPlotArea);
  highlightDataPoint(getCurrentDay().toLowerCase());
  renderHorizontalAxis(categories);
}

async function handleApp() {
  const data = await fetchData('./data/data.json');
  renderChart(data);
}

window.addEventListener('DOMContentLoaded', handleApp);
