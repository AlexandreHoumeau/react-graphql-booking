const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/user')


const events = eventIds => {
  return Event.find({_id: {$in: eventIds}})
  .then(events => {
    return events.map(event => {
      return {...event._doc, creator: user.bind(this, event.creator)}
    })
  })
  .catch(err => {
    throw err
  })
}
const user = userId => {
  return User.findById(userId)
  .then(user => {
    return {
      ...user._doc, 
      _id: user.id, 
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  })
  .catch(err => {
    throw err
  })
}

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          console.log(event)
          return {
            ...event._doc,
            creator: user.bind(this, event._doc.creator)
          }
        })
      })
      .catch((err) => {
        throw err
    })
  },

  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: args.eventInput.date,
      creator: '5e6c0b17530bb7bba9766fed'
    })
    let createdEvents
    return event
    .save()
    .then((res) => {
      createdEvents = {...res._doc, creator: user.bind(this, res._doc.creator)}
      return User.findById('5e6c0b17530bb7bba9766fed')
    })
    .then((user) => {
      if (!user) {
        throw new Error('User not found !')
      }
      user.createdEvents.push(event)
      return user.save()
    })
    .then((result) => {
      return createdEvents
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
    return event
  },
  
  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        })
        return user.save()
      })
      .then((res) => {
        return {...res._doc}
      })
      .catch((err) => {
        throw err
      })
  }
}