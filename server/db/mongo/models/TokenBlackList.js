const mongoose = require('mongoose');
const cron = require('node-cron'); 

const TokenBlacklistSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: () => new Date(new Date().getTime() + 2*60*60*1000),
      expires: 5
    }
  });

  

  const TokenBlacklist = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
  
//   cron.schedule('* * * * * *', function() {
//     const cutoff = new Date();
//     cutoff.setSeconds(cutoff.getSeconds() - 2);
  
//     TokenBlacklist.deleteMany({ createdAt: { $lt: cutoff } }, function(err) {
//       if (err) {
//         console.error('Error deleting old documents', err);
//       }
//     });
//   });


  module.exports = TokenBlacklist;