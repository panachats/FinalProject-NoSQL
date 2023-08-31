google.charts.load("current", {
  packages: ["corechart", "geochart", "calendar"],
});
google.charts.setOnLoadCallback(loadGraph);

var Acountry1 = [];
var strHTML = "";
function sortData() {
  // ดึงค่าจาก Object
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/showGraph");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      for (object of objects) {
        Acountry1.push(object["country"]); // เพื่อที่จะนำข้อมูลใน Array ใส่ในตัวแปร Array ที่สร้างไว้
      }

      Acountry1 = new Set(Acountry1);
      Acountry1 = [...Acountry1]; //แปลงใดๆก็ตามเป็น Array

      // console.log(Acountry1)

      strHTML += "<option selected disabled>Please Select</option>";
      for (x of Acountry1) {
        strHTML += "<option>" + x + "</option>";
      }
      // console.log(strHTML)
      document.getElementById("selectCountry").innerHTML = strHTML;
    }
  };
}
sortData();


function callBack() {
  var DataSelect = document.getElementById('selectCountry').value
  if (DataSelect == 'All') {
    loadGraph();
  } else {
    loadGraphCountry();
  }
}

function myFunction() {
  var x = document.getElementById("b");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const btn = document.getElementById('btn');

// Toggle button text on click
btn.addEventListener('click', function handleClick() {
  const initialText = 'Hidden Graph';

  if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    btn.textContent = 'Show Overview';
  } else {
    btn.textContent = initialText;
  }
});

/**
 * If you need to change the button's inner HTML use:
 *  - `innerHTML` instead of `textContent`
 */



function loadGraphCountry() {
  var FiCount = 0;
  var ReCount = 0;
  var HealthCount = 0;
  var TranCount = 0;

  var year2020 = 0;
  var year2021 = 0;
  var year2022 = 0;

  var total2020 = 0;
  var total2021 = 0;
  var total2022 = 0;

  var percen2020 = 0;
  var percen2021 = 0;
  var percen2022 = 0;

  var DataSelect = document.getElementById('selectCountry').value
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/showGraph");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        if (object["country"] == DataSelect) {
          switch (object["industry"]) {
            case "Finance":
              FiCount += 1;
              break;

            case "Retail":
              ReCount += 1;
              break;

            case "Healthcare":
              HealthCount += 1;
              break;

            case "Transportation":
              TranCount += 1;
              break;
          }
        }
        if (object["country"] == DataSelect) {
          var date = object["date"].slice(0, 4);
          switch (date) {
            case "2020":
              year2020 += 1;
              // console.log(DataSelect, '>',year2020);
              break;
            case "2021":
              year2021 += 1;
              break;
            case "2022":
              year2022 += 1;
              break;
          }

          switch (date) {
            case "2020":
              if (object["total_laid_off"] != null) {
                total2020 += object["total_laid_off"];
                console.log(DataSelect, '>', total2020);
              }

              break;

            case "2021":
              if (object["total_laid_off"] != null) {
                total2021 += object["total_laid_off"];
              }
              break;

            case "2022":
              if (object["total_laid_off"] != null) {
                total2022 += object["total_laid_off"];
              }
              break;
          }

          switch (date) {
            case "2020":
              if (object["percentage_laid_off"] != null) {
                percen2020 += object["percentage_laid_off"];
                // console.log(percen2020, " + ", object["percentage_laid_off"]);
              }

              break;

            case "2021":
              if (object["percentage_laid_off"] != null) {
                percen2021 += object["percentage_laid_off"];
              }
              break;

            case "2022":
              if (object["percentage_laid_off"] != null) {
                percen2022 += object["percentage_laid_off"];
              }
              break;
          }
        }

      }
      var ansPercen2020 = (percen2020 / year2020) * 100;
      var ansPercen2021 = (percen2021 / year2021) * 100;
      var ansPercen2022 = (percen2022 / year2022) * 100;

      var ansPercen2020 = parseFloat(ansPercen2020.toFixed(1));
      var ansPercen2021 = parseFloat(ansPercen2021.toFixed(1));
      var ansPercen2022 = parseFloat(ansPercen2022.toFixed(1));
    }

    var TimelyResponseData = google.visualization.arrayToDataTable([
      ["industry", "Count"],
      ["Finance", FiCount],
      ["Retail", ReCount],
      ["Healthcare", HealthCount],
      ["Transportation", TranCount],
    ]);
    var optionsTimelyResponse = {
      is3D: true,
      title: "อุตสาหกรรมที่มีการเลิกจ้างรวมทั้ง 3 ปี มากที่สุด",
      height: 300,
      slices: {
        0: { color: "#c23a22" },
        1: { color: "#e54c38" },
        2: { color: "#ff6663" },
        3: { color: "#fd706b" },
      },

    };
    var chartTimelyResponse = new google.visualization.PieChart(
      document.getElementById("unChart1")
    );
    chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);


    var year_value = google.visualization.arrayToDataTable([
      ["Year", "Visitations", { role: "style" }],
      ["2020", year2020, "color: #c23a22"],
      ["2021", year2021, "color: #e54c38"],
      ["2022", year2022, "color: #ff6663"],
    ]);

    var view = new google.visualization.DataView(year_value);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "จำนวนครั้งในการเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 300,
    };
    var year = new google.visualization.ColumnChart(
      document.getElementById("unChart2")
    );
    year.draw(view, optionsTimelyResponse);


    var test = google.visualization.arrayToDataTable([
      ["total", "Visitations", { role: "style" }],
      ["2020", total2020, "color: #c23a22"],
      ["2021", total2021, "color: #e54c38"],
      ["2022", total2022, "color: #ff6663"],
    ]);

    var view = new google.visualization.DataView(test);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "จำนวนคนที่ถูกเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 300,
    };
    var yy = new google.visualization.ColumnChart(
      document.getElementById("unChart3")
    );
    yy.draw(view, optionsTimelyResponse);



    var test = google.visualization.arrayToDataTable([
      ["total", "Visitations", { role: "style" }],
      ["2020", ansPercen2020, "color: #c23a22"],
      ["2021", ansPercen2021, "color: #e54c38"],
      ["2022", ansPercen2022, "color: #ff6663"],
    ]);

    var view = new google.visualization.DataView(test);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "% ในการเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 300,

    };
    var yy = new google.visualization.ColumnChart(
      document.getElementById("unChart4")
    );
    yy.draw(view, optionsTimelyResponse);

  }
}


































function loadGraph() {
  var FiCount = 0;
  var ReCount = 0;
  var HealthCount = 0;
  var TranCount = 0;

  var UnCount = 0;
  var InCount = 0;
  var CanadaCount = 0;
  var UkCount = 0;

  var year2020 = 0;
  var year2021 = 0;
  var year2022 = 0;

  var total2020 = 0;
  var total2021 = 0;
  var total2022 = 0;

  var percen2020 = 0;
  var percen2021 = 0;
  var percen2022 = 0;

  // var count = 0;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/showGraph");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        switch (object["industry"]) {
          case "Finance":
            FiCount += 1;
            break;

          case "Retail":
            ReCount += 1;
            break;

          case "Healthcare":
            HealthCount += 1;
            break;

          case "Transportation":
            TranCount += 1;
            break;
        }


        switch (object["country"]) {
          case "United States":
            UnCount += 1;
            break;
          case "India":
            InCount += 1;
            break;

          case "Canada":
            CanadaCount += 1;
            break;

          case "United Kingdom":
            UkCount += 1;
            break;
        }
      }

      for (let object of objects) {
        var date = object["date"].slice(0, 4);

        switch (date) {
          case "2020":
            year2020 += 1;
            break;
          case "2021":
            year2021 += 1;
            break;
          case "2022":
            year2022 += 1;
            break;
        }

        switch (date) {
          case "2020":
            if (object["total_laid_off"] != null) {
              total2020 += object["total_laid_off"];
            }

            break;

          case "2021":
            if (object["total_laid_off"] != null) {
              total2021 += object["total_laid_off"];
            }
            break;

          case "2022":
            if (object["total_laid_off"] != null) {
              total2022 += object["total_laid_off"];
            }
            break;
        }

        switch (date) {
          case "2020":
            if (object["percentage_laid_off"] != null) {
              percen2020 += object["percentage_laid_off"];
              // console.log(percen2020, " + ", object["percentage_laid_off"]);
            }

            break;

          case "2021":
            if (object["percentage_laid_off"] != null) {
              percen2021 += object["percentage_laid_off"];
            }
            break;

          case "2022":
            if (object["percentage_laid_off"] != null) {
              percen2022 += object["percentage_laid_off"];
            }
            break;
        }
      }

      var ansPercen2020 = (percen2020 / year2020) * 100;
      var ansPercen2021 = (percen2021 / year2021) * 100;
      var ansPercen2022 = (percen2022 / year2022) * 100;

      var ansPercen2020 = parseFloat(ansPercen2020.toFixed(1));
      var ansPercen2021 = parseFloat(ansPercen2021.toFixed(1));
      var ansPercen2022 = parseFloat(ansPercen2022.toFixed(1));
    }

    var TimelyResponseData = google.visualization.arrayToDataTable([
      ["industry", "Count"],
      ["Finance", FiCount],
      ["Retail", ReCount],
      ["Healthcare", HealthCount],
      ["Transportation", TranCount],
    ]);
    var optionsTimelyResponse = {
      is3D: true,
      title: "อุตสาหกรรมที่มีการเลิกจ้างรวมทั้ง 3 ปี มากที่สุด",
      height: 300,
      slices: {
        0: { color: "#79DC78" },
        1: { color: "#97E47E" },
        2: { color: "#BFEF88" },
        3: { color: "#E4F78F" },
      },
    };
    var chartTimelyResponse = new google.visualization.PieChart(
      document.getElementById("piechartTimelyResponse")
    );
    chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

    var data = google.visualization.arrayToDataTable([
      [
        "country",
        "Count",
        {
          role: "style",
        },
        {
          role: "annotation",
        },
      ],
      ["United States", UnCount, "#79DC78", "United States"],
      ["India", InCount, "color: #97E47E", "India"],
      ["Canada", CanadaCount, "color: #BFEF88", "Canada"],
      ["United Kingdom", UkCount, "color: #E4F78F", "United Kingdom"],
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionSubmitted = {
      title: "4 ประเทศที่มีการเลิกจ้างพนักงานรวมทั้ง 3 ปี มากที่สุด",
      legend: { position: "none" },
      height: 300,
    };
    var chartSubmitted = new google.visualization.BarChart(
      document.getElementById("barchartSubmitted")
    );
    chartSubmitted.draw(view, optionSubmitted);

    var year_value = google.visualization.arrayToDataTable([
      ["Year", "Visitations", { role: "style" }],
      ["2020", year2020, "color: #79DC78"],
      ["2021", year2021, "color: #97E47E"],
      ["2022", year2022, "color: #BFEF88"],
    ]);

    var view = new google.visualization.DataView(year_value);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "จำนวนครั้งในการเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 300,
    };
    var year = new google.visualization.ColumnChart(
      document.getElementById("columnchart_year")
    );
    year.draw(view, optionsTimelyResponse);

    var test = google.visualization.arrayToDataTable([
      ["total", "Visitations", { role: "style" }],
      ["2020", total2020, "color: #79DC78"],
      ["2021", total2021, "color: #97E47E"],
      ["2022", total2022, "color: #BFEF88"],
    ]);

    var view = new google.visualization.DataView(test);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "จำนวนคนที่ถูกเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 300,
    };
    var yy = new google.visualization.ColumnChart(
      document.getElementById("columnchart_total")
    );
    yy.draw(view, optionsTimelyResponse);

    var test = google.visualization.arrayToDataTable([
      ["total", "Visitations", { role: "style" }],
      ["2020", ansPercen2020, "color: #79DC78"],
      ["2021", ansPercen2021, "color: #97E47E"],
      ["2022", ansPercen2022, "color: #BFEF88"],
    ]);

    var view = new google.visualization.DataView(test);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
      2,
    ]);

    var optionsTimelyResponse = {
      title: "% ในการเลิกจ้างในแต่ละปี",
      legend: { position: "none" },
      height: 500,
    };
    var yy = new google.visualization.ColumnChart(
      document.getElementById("columnchart_percen")
    );
    yy.draw(view, optionsTimelyResponse);
  };
}
