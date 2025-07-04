function fetchDataAndUpdateTable() {
    fetch('/get-datatable')
        .then(response => response.json())
        .then(data => {
            updateDataTable(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateDataTable(data) {
    am5.ready(function() {

        var root = am5.Root.new("datadiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        var cursor = chart.set("cursor" , am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible" , false);

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30});
        xRenderer.labels.template.setAll({
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
            text: "" 
        });
    

        xRenderer.grid.template.setAll({
            location: 1,
            
        })

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "class",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })

        }));

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "class",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({cornerRadiusTL: 5, cornerRadiusTR: 5 , strokeOpacity: 0});
        series.columns.template.adapters.add("fill", function(fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke" , function(stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        xAxis.data.setAll(data);
        series.data.setAll(data);

        series.appear(1000);
        chart.appear(1000, 100);




 });
}



document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateTable()
});
 