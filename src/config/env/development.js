export const devConfig = {
  port: 3000,
  database: 'invoice-builder',
  secret: 'TorresSanchez_1634',
  frontEndUrl: 'http://localhost:4200',
  auth: {
    google: {
      client: '21404434945-guaaur3evielj5otsilv2m08t0h15rsb.apps.googleusercontent.com',
      secret: 'jWkq6sb0jXJvFY4OjStILQXi',
      callback: 'http://localhost:3000/api/auth/google/callback',
    },
    twitter: {
      client: 'foPpCdXzTWkyPp7ljFtYfoREV',
      secret: '1TNTK38wxf8z1UWSLz1yoIv7tb3dMfLeA7glYF2AixnszcmASH',
      callback: 'http://148.237.42.44:3000/api/auth/twitter/callback',
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    },
  },
};
