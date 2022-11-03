import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '.'


export const getOrCreateUser = async (user, userObject) => {
    const ref = doc(db, 'users', user.uid)
    const snap = await getDoc(ref);
    if (snap.exists()) {
        return snap.data()
    } else {

        if (!userObject) return

        await setDoc(ref, {
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            email: userObject.email,
            uid: user.uid
        })

    }



}