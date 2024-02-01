var outputDiv = document.getElementById("outputDiv");
var defaultHideOutput = document.getElementById("outputDiv");
var btnCalcAgain = document.getElementById("btnCalcAgain");
var btnExport = document.getElementById("btnExport");
btnExport.style.display = "none";
defaultHideOutput.style.display = "none";
btnCalcAgain.style.display = "none";

document
  .getElementById("calculatorForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var hideCalc = document.getElementById("hideCalc");
    hideCalc.style.display = "none";

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if necessary
    var date = ("0" + currentDate.getDate()).slice(-2); // Add leading zero if necessary
    var formattedDate = year + month + date;

    var grossIncome = parseFloat(
      document.getElementById("inputGrossIncome").value
    );
    var milesDriven = parseFloat(
      document.getElementById("inputMilesDriven").value
    );
    var mpg = parseFloat(document.getElementById("inputMPG").value);
    var gasPrice = parseFloat(document.getElementById("inputGasPrice").value);
    var taxRate = parseFloat(document.getElementById("inputTaxRate").value);
    var mileageRate = parseFloat(
      document.getElementById("inputMileageRate").value
    );

    var mileageDeductions = milesDriven * mileageRate;
    var gasCost = (milesDriven / mpg) * gasPrice;
    var businessProfit = grossIncome - mileageDeductions;
    var taxAmount = businessProfit * taxRate;

    var netPay;
    if (taxAmount > 0) {
      netPay = grossIncome - taxAmount - gasCost;
    } else {
      netPay = grossIncome - gasCost;
    }

    var results = {
      grossIncome: grossIncome,
      gasCost: gasCost,
      taxAmount: taxAmount,
      mileageDeductions: mileageDeductions,
      netPay: netPay,
    };


    // display the output from the form
    outputDiv.style.display = "block";
    btnCalcAgain.style.display = "block";
    btnExport.style.display = "block";
    outputDiv.innerHTML =
      "<h2><u>Gross Income & Expenses</u></h2><br>" +
      "<strong>Gross Income:</strong> $" +
      grossIncome.toFixed(2) +
      "<br>" +
      "<strong>Gas costs:</strong> $" +
      gasCost.toFixed(2) +
      "<br>" +
      "<strong>Taxes (pre-deduction):</strong> $" +
      taxAmount.toFixed(2) +
      "<br>" +
      "<br><br>" +
      "<h2><u>Deductions Earned</u></h2><br>" +
      "<strong>Mileage Deductions:</strong> $" +
      mileageDeductions.toFixed(2) +
      " deducted from " +
      milesDriven +
      " miles recorded." +
      "<br><br>" +
      "<h2><u>Remaining Taxes</u></h2><br>" +
      "<strong>Taxes owed:</strong> $" +
      Math.max(0, taxAmount - mileageDeductions).toFixed(2) +
      "<br><br>" +
      "<h2><u>Take Home Income</u></h2><br>" +
      "<strong>Total income:</strong> $" +
      netPay.toFixed(2);


   // export to PDF
    btnExport.addEventListener("click", function () {
      var doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Gross Income & Expenses", 10, 20);
      doc.setFontSize(16);
      doc.text("Gross Income: $" + results.grossIncome.toFixed(2), 10, 30);
      doc.text("Gas costs: $" + results.gasCost.toFixed(2), 10, 40);
      doc.text(
        "Taxes (pre-deduction): $" + results.taxAmount.toFixed(2),
        10,
        50
      );

      doc.setFontSize(22);
      doc.text("Deductions Earned", 10, 70);
      doc.setFontSize(16);
      doc.text(
        "Mileage Deductions: $" +
          results.mileageDeductions.toFixed(2) +
          " deducted from " +
          milesDriven +
          " miles recorded.",
        10,
        80
      );

      doc.setFontSize(22);
      doc.text("Remaining Taxes", 10, 100);
      doc.setFontSize(16);
      doc.text(
        "Taxes owed: $" +
          Math.max(0, results.taxAmount - results.mileageDeductions).toFixed(2),
        10,
        110
      );

      doc.setFontSize(22);
      doc.text("Take Home Income", 10, 130);
      doc.setFontSize(16);
      doc.text("Total income: $" + results.netPay.toFixed(2), 10, 140);

      doc.setFontSize(12);
      doc.text("Date exported (YYYYMMDD): " + formattedDate, 10, 170);

      doc.save("Income_" + formattedDate + ".pdf");
    });
  });
