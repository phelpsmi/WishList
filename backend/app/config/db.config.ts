export const config = {
  HOST: "localhost",
  USER: "sys_giftlist",
  PASSWORD: "password",
  DB: "giftlist",
  dialect: "postgres" as const,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}