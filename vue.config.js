const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/teidesat_web/",
});

// module.exports = {
//   publicPath:
//     ProcessingInstruction.env.NODE_ENV === "production" ? "teidesat_web" : "/",
// };
