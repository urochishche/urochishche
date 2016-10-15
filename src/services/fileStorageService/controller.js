import firebase from 'firebase';

const randomOptions = {
    min: 1,
    max: Math.pow(2, 32)
};

export default class FileStorageServiceController {
    constructor() {
        'ngInject';

        this.storageRef = firebase.storage().ref();
    }

    uploadFile(file) {
        const fileKey = this._getRandomValue();
        return new Promise((resolve, reject) => {
            const uploadTask = this.storageRef.child(fileKey.toString()).put(file);
            uploadTask.on('state_changed', snapshot => {
                }, error => {
                    reject(error);
                }, () => {
                    resolve(fileKey);
                });
        });
    }

    // deleteFile(eventKey) {
    //     return this._deleteFile(eventKey, fileName.provision);
    // }

    // getFileUrl(eventKey) {
    //     return this._getUrl(eventKey, fileName.provision);
    // }

    // getFileName(eventKey) {
    //     return this._getFileName({
    //         eventKey, 
    //         fileName: fileName.provision
    //     });
    // }

    // getFileSize(eventKey) {
    //     return this._getFileSize({
    //         eventKey,
    //         fileName: fileName.provision
    //     });
    // }

    /* API */

    _getRandomValue() {
        const { min, max } = randomOptions;
        const value = Math.random() * (max - min);
        return Math.floor(value) + min;
    }

    // _getFileRef(key, fileName) {
    //     return this.storageRef.child(`${fileName}${key}`);
    // }

    // _deleteFile(eventKey, fileName) {
    //     const ref = this._getFileRef(eventKey, fileName);
    //     return ref.delete()
    //         .catch(error => {
    //             if (error.code === 'storage/object-not-found') {
    //                 return;
    //             } else {
    //                 throw Error(error);
    //             }
    //         });
    // }

    // _getUrl(key, fileName) {
    //     const ref = this._getFileRef(key, fileName);
    //     return ref.getDownloadURL()
    //         .then(url => {
    //             return url;
    //         })
    //         .catch(error => {
    //             if (error.code === 'storage/object-not-found') {
    //                 return null;
    //             } else {
    //                 throw Error(error);
    //             }
    //         });
    // }

    // _getFileName(options) {
    //     return this._getFileMetadata(options)
    //         .then(metadata => {
    //             return metadata ? metadata.name : null;
    //         });
    // }

    // _getFileSize(options) {
    //     return this._getFileMetadata(options)
    //         .then(metadata => {
    //             return metadata ? metadata.size : null;
    //         });
    // }

    // _getFileMetadata({ eventKey, fileName }) {
    //     const ref = this._getFileRef(eventKey, fileName);
    //     return ref.getMetadata()
    //         .catch(error => {
    //             if (error.code === 'storage/object-not-found') {
    //                 return null;
    //             } else {
    //                 throw Error(error);
    //             }
    //         });
    // }
};
