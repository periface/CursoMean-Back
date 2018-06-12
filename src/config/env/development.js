export const devConfig = {
  port: 3000,
  database: 'invoice-builder',
  secret: 'TorresSanchez_1634',
  auth: {
    google: {
      client: '21404434945-guaaur3evielj5otsilv2m08t0h15rsb.apps.googleusercontent.com',
      secret: 'jWkq6sb0jXJvFY4OjStILQXi',
      callback: 'http://localhost:3000/api/auth/google/callback',
    },
  },
};
