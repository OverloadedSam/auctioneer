export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let base64String;
    reader.onloadend = () => {
      base64String = reader.result.toString();
      resolve(base64String);
    };
    reader.readAsDataURL(file);
    reader.onerror = (e) => reject(e);
  });
};

export const validateFileType = (base64String, allowedTypes) => {
  try {
    const fileType = base64String.substring(
      base64String.indexOf(':') + 1,
      base64String.indexOf(';')
    );

    if (!fileType?.length || !allowedTypes?.length) return false;
    const isValid = allowedTypes.some((type) => fileType.includes(type));

    return isValid;
  } catch (error) {
    return error;
  }
};

export const validateFileSize = (base64String, sizeLimitInBytes) => {
  let base64Length = base64String.length - (base64String.indexOf(',') + 1);
  let padding = base64String.endsWith('==')
    ? 2
    : base64String.endsWith('=')
    ? 1
    : 0;
  // Actual file size are 75% of base64 string. (i.e 0.75 is multiplied)
  let fileSizeInBytes = base64Length * 0.75 - padding;

  return fileSizeInBytes <= sizeLimitInBytes;
};

export const addMinutesToDate = (date, minutes) => {
  const dateTime = new Date(date);
  const millisecondsInAMinute = 60000;

  return new Date(dateTime.getTime() + minutes * millisecondsInAMinute);
};
