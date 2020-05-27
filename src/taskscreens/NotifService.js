import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NotificationHandler from './NotificationHandler';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function(number) {
      if(number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }



  localNotif(soundName) {

    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      playSound: !!soundName, // (optional) default: true
      soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more

    });
  }

  scheduleNotif(soundName) {

    let nextHour = new Date();
      nextHour.setDate(nextHour.getDate() + 1);
      nextHour.setHours(nextHour.getHours() - 1);

    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), // in 30 secs

      //repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      //date: nextHour,

      //repeat every minute for testing
      //repeatType: 'minute',
      //date: new Date(Date.now()),

      /* Android Only Properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'blue', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: '', // (optional) default: empty string
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

      /* iOS and Android properties */
      title: 'Watering reminder', // (optional)
      message: 'Do not forget to water your plants!', // (required)
      playSound: !!soundName, // (optional) default: true
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}