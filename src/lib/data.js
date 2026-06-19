import { headers } from 'next/headers';
import { auth } from './auth';


// export const getProtectedMessage = async (input = '') => {
//     const { token } = await auth.api.getToken({
//         headers: await headers()
//     })


//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/protected-message`, {
//         headers: {
//             authorization: `Bearer ${token}`
//         }
//     });
//     const data = await res.json();
//     // console.log('data: ', data);
//     return data;
// }