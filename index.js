const { Keystone } = require('@keystonejs/keystone');
const { Text, Integer } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'keystone-movie-app';
const adapterConfig = { mongoUri: 'mongodb://localhost/keystone-movie-app' };


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});

keystone.createList('Movie', {
  fields: {
    title: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    rating: {
      type: Integer,
      isRequired: true,
      defaultValue: 10
    }
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true }),
  ],
};
