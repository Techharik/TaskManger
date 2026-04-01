type configTypes = {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: string;
};

const config: configTypes = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};
export default config;
