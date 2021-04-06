import axios from 'axios';
/*
const instance = axios.create({
    headers: {
        apiKey: 'AIzaSyDZro_Ko--n8eY19bDYpM7lQ1Eql0lSwnQ"'
    }
})*/

export const dataAPI = {
    getAllScreams() {
        return axios.get('/screams');
    },
    like(screamId) {
        return axios.get(`/scream/${screamId}/like`);
    },
    unlike(screamId) {
        return axios.get(`/scream/${screamId}/unlike`);
    },
    delete(screamId) {
        return axios.delete(`/scream/${screamId}`);
    },
    postNewScream(body) {
        return axios.post(`/scream`, body);
    },
    getScream(screamId) {
        return axios.get(`/scream/${screamId}`);
    },
    commentOnScream(screamId, body) {
        return axios.post(`/scream/${screamId}/comment`, body);
    }
}

export const userAPI = {
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile, photoFile.name);
        return axios.post('/user/image', formData);
    },
    editUserDetails(userDetails) {
        return axios.post('/user', userDetails);
    },
    getUserData(userHandle) {
        return axios.get(`/user/${userHandle}`);
    },
    markNotificationsRead(notificationIds) {
        return axios.post(`/notifications`, notificationIds);
    }
}