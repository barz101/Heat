import httpService from './httpService'
import Axios from 'axios';

var axios = Axios.create({
    withCredentials: true
});

export default {
    login,
    logout,
    signup,
    uploadImg
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function uploadImg(ev) {
    const CLOUD_NAME = 'dgddifsbd';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'tp1cjabt');
    return Axios.post(UPLOAD_URL, formData)
        .then(res => { return res.data; })
        .catch(err => console.error(err))
}