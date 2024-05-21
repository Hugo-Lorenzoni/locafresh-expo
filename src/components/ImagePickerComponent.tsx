import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Pressable, StyleSheet, View } from "react-native";
import Button from "./Button";

export default function ImagePickerComponent({
  image,
  setImage,
}: {
  image: ImagePicker.ImagePickerAsset | null;
  setImage: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset | null>
  >;
}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <View>
            <Image
              source={{ uri: image.uri }}
              contentFit="contain"
              style={styles.image}
            />

            <View style={styles.absoluteContainer}>
              <Pressable
                style={{
                  padding: 15,
                  backgroundColor: "white",
                  borderRadius: 10,
                  margin: 10,
                }}
                onPress={() => setImage(null)}
              >
                <FontAwesome6 name="trash-can" color="tomato" size={25} />
              </Pressable>
            </View>
          </View>
          <Button
            title="Changer d'image"
            style={{ backgroundColor: "tomato" }}
            onPress={pickImage}
          />
        </>
      ) : (
        <Button title="Choisir une image" onPress={pickImage}>
          <FontAwesome6 name="image" color="white" size={25}></FontAwesome6>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginVertical: 15,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
});
