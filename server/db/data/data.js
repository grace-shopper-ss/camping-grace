// import danfo to convert excel data to json
const dfd = require("danfojs-node");
const xl = "./mockData.xlsx";

// function to get data from sheet
const get = async (sheet) => {
  const df = await dfd.read_excel(xl, { sheet });
  return df;
};

// pull data out of excel
let products = get("Products");
let categories = get("Categories");
let inventory = get("Inventory");

// convert to json

// export data to be used in seed
module.exports = {
  products,
  categories,
  inventory,
};
