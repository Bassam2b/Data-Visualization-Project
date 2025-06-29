function fetchDataAndUpdateMix() {
  fetch('/get-datamix')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateMix(data);
      })
      .catch(error => console.error('Error:', error));
}

function updateMix(data_df) {
  am5.ready(function() {

      var root = am5.Root.new("mixdiv");

      root.setThemes([
          am5themes_Animated.new(root)
      ]);

      var chart = root.container.children.push(am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(50)
      }));

      var series = chart.series.push(am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          alignLabels: false
      }));

      series.labels.template.setAll({
          textType: "circular",
          centerX: 0,
          centerY: 0
      });

      // Update the series data with the data received from Flask
      series.data.setAll(data_df);

      // Create legend
      var legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
      }));

      legend.data.setAll(series.dataItems);

      series.appear(1000, 100);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndUpdateMix();
});
