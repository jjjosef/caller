var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/eBJdJLJ20bo:APA91bGhErSs0IFKYxJwtcYmYNoRkuVWxwydi3dY4adn9fRBDWhxzkincZlQJr3pcocBMM-IXZiubMMLwFV8PxOd42XwCuyMzUHhbe8sHANY8rp959Q4gknH9AGpq-3etU2uNGGLMDeQ","expirationTime":null,"keys":{"p256dh":"BJDsR8YInskouRmZx00ZwotQQlilsSmCZSrfK9VZ5lxAR1-Fu6Nd0uNLkV3S1ekt6fWRG-t80NRH-0-WMtkOMhQ=","auth":"CF7bPMIX8npeGxGNEYnHMg=="}};

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'KUyaJa9zf3EaD5be08CfnI896TSK4SXeNcZ-4HxGhNo',
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);

