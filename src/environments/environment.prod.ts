/**
 * This is production environment variables file.
 *
 */

// export const environment = {
//   production: true,
//   oauthServerBaseUrl: 'http://35.161.159.36:8080',
//   oauthClientId: 'projectOneApp',
//   oauthClientSecret: '$2y$10$qNoD/wRvfGu7Ta8PbrqEiOeXxGrcXzaTAEN9zRqMXqXYwVhSWKWRW',
//   oauthClientScope: 'read',
//   customerServerBaseUrl: 'http://52.41.252.212:8080',
//   userLocale: 'en-US'
// };

export const environment = {
  production: false,
  oauthServerBaseUrl: 'http://localhost:9999',
  oauthClientId: 'projectOneApp',
  oauthClientSecret: 'password1',
  oauthClientScope: 'read',
  customerServerBaseUrl: 'http://localhost:9998',
  userLocale: 'en-US'
};
