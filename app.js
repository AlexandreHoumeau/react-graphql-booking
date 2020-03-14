const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const app = express()
const mongoose = require('mongoose')

const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')
mongoose.set('useCreateIndex', true)


app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}))

app.use(bodyParser.json())

mongoose.
  connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-jeupf.mongodb.net/${process.env.MONDO_NAME_DB}?retryWrites=true&w=majority`
  ,{ useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    console.log('hello World')
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  })
