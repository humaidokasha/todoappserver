var CloudMessagingnode  = require('fcm-node');
var token = require('../handlers/auth')
var serverKey = 'AAAAVPqcY5Y:APA91bGXrDhdL4IzAMMcb9BYNIOFL-034d3itZ6w-E2pAnQl67sMBRp2AiSDWfS6U7f-7S2KFIuUtQbouTiMi5dQDGltvAaJ1v_T9JKjYmCqaBBeKleeEmaXrWjCFSY49QQBnu3J-dR0'
var CloudMessaging = new fcmnode(serverKey);
exports.sendNotification = async(title, body, data) => {
    token.getUserTokens().then(tokens => {
        if (tokens) {
            tokens.forEach(token => {
                const message = {
                    to: token,
                    notification: {
                        title,
                        body
                    },
                    data: data
                };
                CloudMessaging.send(message, function(err, response) { 
                    if (err) {
                        console.log('Something has gone wrong!');
                    } else {
                        console.log('Successfully sent with response:', response);
                    }
                });
            });
        }
    })
}