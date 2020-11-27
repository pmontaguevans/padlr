import React, {useReducer, useMemo, useEffect} from 'react';
import SecureStorage from 'react-native-secure-storage';

import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const usersRef = firebase.firestore().collection('users');
            usersRef
              .doc(uid)
              .get()
              .then((firestoreDocument) => {
                if (!firestoreDocument.exists) {
                  alert('User does not exist anymore.');
                  return;
                }
                const user = firestoreDocument.data();
                SecureStorage.setItem('user', JSON.stringify(user));
                dispatch(createAction('SET_USER', user));

                //   navigation.navigate('Home', { user })
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
        // await SecureStorage.setItem('user', JSON.stringify(user));
        // dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
        await SecureStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (email, password) => {
        await sleep(2000);

        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
            const uid = response.user.uid;
            const data = {
              id: uid,
              answered_survey,
              email,
              fullName,
              specialties,
              location: {
                country,
                city,
              },
              elo: 1500,
              rank: {
                local,
                regional,
                national,
                international,
              },
              team: {
                id: uid,
                name,
                elo: 0,
                rank: {
                  local,
                  regional,
                  national,
                  international,
                },
              },
            };
            const usersRef = firebase.firestore().collection('users');
            usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                sleep(2000);
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      },
    }),
    [],
  );
  useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then((user) => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);

  return {auth, state};
}
