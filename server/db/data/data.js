// import modules
const xlsx = require("xlsx");
const path = require("path");

// point to file
const xl = path.join(process.cwd(), "server", "db", "data", "mockData.xlsx");

// destructure sheets object from return of readFile (contains all sheets and the data within)
const { Sheets } = xlsx.readFile(xl);

// function to convert excel to json
const excelToJson = (sheet) => {
  return xlsx.utils.sheet_to_json(sheet, { raw: true });
};

// run function on each of the sheets and save data in vars to export to seed
const products = excelToJson(Sheets.Products);
const categories = excelToJson(Sheets.Categories);
const inventory = excelToJson(Sheets.Inventory);

// export data
module.exports = {
  products,
  categories,
  inventory,
};
