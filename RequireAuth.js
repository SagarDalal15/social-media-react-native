import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { UserContext } from './contexts/user';
import { db } from './firebaseConfig';

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const [user, setUser] = useContext(UserContext);

    if (user) {
      useEffect(() => {
        const currentUser = user.email.replace('@gmail.com', '');

        db.collection('userChat')
          .doc(currentUser)
          .get()
          .then((doc) => {
            if (!doc.data()) {
              db.collection('userChat').doc(currentUser).set({ doc: 'created' });
            } else if (doc.data().doc !== 'created') {
              db.collection('userChat').doc(currentUser).set({ doc: 'created' });
            } else {
            }
          });
      }, []);

      return (
        <View>
          <ChildComponent {...props} />
        </View>
      );
    } else {
      return null;
    }
  };

  return ComposedComponent;
};
