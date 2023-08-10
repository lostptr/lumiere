import { Platform } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, PermissionStatus, RESULTS, check, request } from "react-native-permissions";

interface ImageResult {
  success: boolean,
  imageUri?: string,
  error?: string,
}

const DEFAULT_OPTIONS = {
  mediaType: 'photo',
  quality: 0.5,
  includeBase64: true,
} as const;

export async function takePicture(): Promise<ImageResult> {
  const permissionStatus = await checkOrRequestCameraPermission();

  if (permissionStatus !== RESULTS.GRANTED) {
    return { success: false, error: `Image service error 'permission': permission status is '${permissionStatus}'.` };
  }

  const result = await launchCamera(DEFAULT_OPTIONS);

  if (result.didCancel) {
    return { success: false };
  }

  if (result.errorCode) {
    return { success: false, error: `Image service error '${result.errorCode}': ${result.errorMessage}` };
  }

  const picture = result.assets?.at(0);
  if (picture) {
    const uri = `data:${picture.type};base64,${picture.base64}`;
    return { success: true, imageUri: uri };
  }

  console.error("No image could be found despite no error being returned.");
  return { success: false, error: `Image service error: ${result.errorMessage}` };

}

export async function pickFromGallery(): Promise<ImageResult> {
  const result = await launchImageLibrary(DEFAULT_OPTIONS);

  if (result.didCancel) {
    return { success: false };
  }

  if (result.errorCode) {
    return { success: false, error: result.errorCode };
  }

  const picture = result.assets?.at(0);
  if (picture) {
    const uri = `data:${picture.type};base64,${picture.base64}`;
    return { success: true, imageUri: uri };
  }

  console.error("No image could be found despite no error being returned.");
  return { success: false, error: "others" };
}

const CAMERA_PERMISSIONS = {
  'android': PERMISSIONS.ANDROID.CAMERA,
  'ios': PERMISSIONS.IOS.CAMERA,
  'macos': undefined,
  'windows': undefined,
  'web': undefined,
} as const;

const CAMERA_PERMISSION_PROMPT = {
  title: 'Device camera permission',
  message: "We request access to the device's camera.",
  buttonPositive: 'Allow',
};

async function checkOrRequestCameraPermission(): Promise<PermissionStatus> {
  const permission = CAMERA_PERMISSIONS[Platform.OS];
  if (!permission) {
    return RESULTS.UNAVAILABLE;
  }

  const result = await check(permission);

  if (result === RESULTS.DENIED) {
    const requestResult = await request(permission, CAMERA_PERMISSION_PROMPT);
    return requestResult;
  }

  return result;
}