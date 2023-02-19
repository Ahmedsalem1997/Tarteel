const validExtensions = ['png', 'jpeg', 'jpg', 'mp3', 'mpeg'];

export function isValidFileUploaded(file, fileType) {
    const fileExtensions = file.type.split('/');
    console.log(file.type);
    if (fileExtensions[0] !== fileType) {
        return `${fileType}UploadNotSupported`;
    }
    else if (!validExtensions.includes(fileExtensions[1])) {
        return 'fileExtensionNotSupported';
    }
    else if (fileType === 'audio' && file.size > 15728640) {
        return 'maxAudioFileSize';
    }
    else if (fileType === 'image' && file.size > 5242880) {
        return 'maxImgFileSize';
    }
    else {
        return;
    }
}