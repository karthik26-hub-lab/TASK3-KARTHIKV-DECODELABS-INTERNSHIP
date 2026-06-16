const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    unique: true
  },
  state: {
    type: String,
    required: [true, 'A destination must belong to a state']
  },
  photo: {
    type: String,
    // We don't make it required so users can still add places without photos,
    // but we can provide a default placeholder image just in case!
    default: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;