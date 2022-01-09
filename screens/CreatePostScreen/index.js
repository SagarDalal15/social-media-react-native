import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePostScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [img, setImg] = useState(null);
  const [loaded, setLoaded] = useState(false);

  //Camera Type
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    // request permission to access media library
    requestPermission();
    (async () => {
      const camera = await Camera.requestCameraPermissionsAsync();
      setHasPermission(camera.status === 'granted');
    })();

    // Is user on camera screen
    props.navigation.addListener('focus', () => {
      setLoaded(true);
    });

    // Is user on camera screen
    props.navigation.addListener('blur', () => {
      setLoaded(false);
    });
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const clickPhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1 };

      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;

      if (data && source) {
        await cameraRef.current.pausePreview();
        setImg(source);
        setIsPreview(true);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setImg(null);
    setIsPreview(false);
  };

  const postImage = async () => {
    await cameraRef.current.resumePreview();
    setIsCameraReady(false);
    setIsPreview(false);
    props.navigation.navigate('AddCaptionScreen', { img: img });
  };

  const postGalleryImage = async (galleryImage) => {
    props.navigation.navigate('AddCaptionScreen', { img: galleryImage });
  };

  // Image Picker for Gallery
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    const source = pickerResult.uri;
    if (source) {
      postGalleryImage(source);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loaded && (
        <View style={{ flex: 1 }}>
          <Camera
            ref={cameraRef}
            style={{ flex: 2 }}
            type={type}
            ratio="1:1"
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
          ></Camera>

          <View
            style={{
              flex: 1,
              backgroundColor: 'wheat',
            }}
          >
            {isPreview && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Text
                  onPress={cancelPreview}
                  style={{
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  Cancel
                </Text>
                <Text
                  onPress={postImage}
                  style={{
                    fontSize: 18,
                    color: 'white',
                  }}
                >
                  Post
                </Text>
              </View>
            )}
            {!isPreview && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 5,
                    height: 60,
                    width: 110,
                    backgroundColor: 'black',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={openImagePickerAsync}
                  disabled={!isCameraReady}
                >
                  <Text style={{ fontSize: 18, color: 'white' }}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 50,
                    height: 100,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={clickPhoto}
                  disabled={!isCameraReady}
                >
                  <Text style={{ fontSize: 14 }}>Take</Text>
                  <Text style={{ fontSize: 14 }}>Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 5,
                    height: 60,
                    width: 110,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                  disabled={!isCameraReady}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    );
                  }}
                >
                  <Text style={{ fontSize: 18, color: 'white' }}>Flip Screen</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
