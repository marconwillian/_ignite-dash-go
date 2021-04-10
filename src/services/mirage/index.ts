import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}


export function makeServer(){
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(){
          return faker.name.firstName()
        },
        email(){
          return faker.internet.email()
        },
        createdAt(){
          return faker.date.recent()
        },
      })
    },

    seeds(server){
      server.createList('user', 10);
    },

    routes(){
      this.namespace = 'api';
      this.timing

      this.get('/users');
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  });


  return server;
}