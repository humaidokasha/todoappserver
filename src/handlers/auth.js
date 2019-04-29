const UserAgentParser = require('ua-parser-js');
const firebase = require('../firebase/index')
const firebase_admin = require('../firebase/index');
exports.authenticateToken = (token) =>{
    return new Promise((resolve,reject)=>{
        firebase_admin.firebase_dmin.auth().verifyIdToken(token).then(auth=>{  
            if(auth){
                resolve(auth)
            }
            else{
                resolve(null)
            }
        }).catch(err=>{
           
            resolve(null)
        })
       })
}

exports.userLogin = async(req,res)=>{
    const userObj = req.body
    const email = userObj.email;
    const password = userObj.password;
    const token = userObj.token;
    const dev = new UserAgentParser(request.headers['user-agent']); 
    firebase.fire_base.auth().signInWithEmailAndPassword(email, password).then(user => {  
      firebase.fire_base.database().ref('users/' + user.user.uid + '/' + dev.getOS().name) 
          .set({
            token: token
          })
          .then(chk => {
            if(chk){
            res.send("user successfully logged In")
          }
            else{
            res.send("unable to login")
            }
          }).catch(err=>{
            console.log(err)
        })
      }).catch(err=>{
        console.log(err)
    })
    
}

exports.getUserTokens = () => {
    return new Promise((resolve, reject) => {
      const tokens = [];
      firebase.fire_base.database().ref('users').on('value', function(snapshot) {
          const users = snapshot.val();
          Object.keys(users).forEach(item => {  
            const dev = users[item];
            Object.keys(dev).forEach(item => { 
              tokens.push(dev[item].token);
            });
          });
          if(tokens)
          resolve(tokens);
          else
          resolve(null)
        });
    });
 
}

