import React from "react";

const GitHubGraph = ({ contributions }) => {
  const splitContributionsByMonthAndDay = () => {
    const contributionsByMonthAndDay = {};

    contributions.forEach((contribution) => {
      const date = new Date(contribution.date);
      const month = date.getMonth();
      const day = date.getDate();
      if (!contributionsByMonthAndDay[month]) {
        contributionsByMonthAndDay[month] = {};
      }
      contributionsByMonthAndDay[month][day] = contribution.count;
    });

    return contributionsByMonthAndDay;
  };

  const contributionsByMonthAndDay = splitContributionsByMonthAndDay();

  const renderGraphCells = () => {
    const cells = [];
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const count = contributionsByMonthAndDay[month]?.[day] || 0;
        const shade = Math.min(Math.round(count / 5), 5);
        const color =
          count > 0 ? `rgb(30, ${150 + shade * 15}, 30)` : "#ebedf0";
        cells.push(
          <rect
            key={`${month}-${day}`}
            width="10"
            height="10"
            x={day * 12}
            y={month * 12}
            fill={color}
          />
        );
      }
    }
    return cells;
  };

  const renderMonthAndDayLabels = () => {
    const labels = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let month = 0; month < 12; month++) {
      labels.push(
        <text
          key={`month-${month}`}
          x={-30} // Adjust the x position for month names
          y={(month + 1) * 12}
          fill="#fff"
          fontSize="10"
          className="text-green-500" // Apply Tailwind CSS for color
        >
          {monthNames[month]}
        </text>
      );
    }
    for (let day = 1; day <= 31; day++) {
      labels.push(
        <text
          key={`day-${day}`}
          x={day * 12 - 1} // Adjust the x position for day numbers
          y={-2} // Adjust the y position for day numbers
          fill="#fff"
          fontSize="8"
          className="text-gray-400" // Apply Tailwind CSS for color
        >
          {day}
        </text>
      );
    }
    return labels;
  };

  return (
    <svg
      width="750"
      height="300"
      viewBox="0 0 400 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: "rgb(31 41 55)" }}
    >
      {/* Render month and day labels */}
      <g transform="translate(41, 15)">{renderMonthAndDayLabels()}</g>
      {/* Render graph cells */}
      <g transform="translate(40, 20)">{renderGraphCells()}</g>
    </svg>
  );
};

export default GitHubGraph;
