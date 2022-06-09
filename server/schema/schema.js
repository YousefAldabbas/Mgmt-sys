const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType, // GraphQLObjectType is a class that defines the structure of a GraphQL object
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//projeect type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType), // because it's a list of clients
      // we dont need args because we arent filtering the list
      resolve(parent, args) {
       return Project.find()
      },
    },

    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }, //args is an object that defines the arguments that can be passed to the query
      },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType), // because it's a list of clients
      // we dont need args because we arent filtering the list
      resolve(parent, args) {
        return Client.find();
      },
    },

    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID }, //args is an object that defines the arguments that can be passed to the query
      },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
