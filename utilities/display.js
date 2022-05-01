const display = (message, status = "info") => {
  if (status == "info") return console.log("\x1b[36m%s\x1b[0m", "API:", message);
  if (status == "err") return console.log("\x1b[31m%s\x1b[0m", "API:", message);
};

module.exports = display;
