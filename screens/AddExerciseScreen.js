import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddExercise({ route, navigation }) {

  const { addExercise } = route.params;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // 📷 Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 💾 Save exercise
  const handleSubmit = () => {

    if (!name || !description) {
      alert("Please fill all fields");
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name: name,
      description: description,
      image: image || 'https://picsum.photos/300',
      completed: false
    };

    addExercise(newExercise);

    alert("Exercise added successfully!");

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>

      {/* NAME */}
      <TextInput
        placeholder="Exercise Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      {/* DESCRIPTION */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      {/* IMAGE PICK BUTTON */}
      <TouchableOpacity onPress={pickImage} style={{ marginBottom: 10 }}>
        <Text style={{ color: 'blue' }}>Pick Image from Gallery</Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginBottom: 10 }}
        />
      )}

      {/* SAVE BUTTON */}
      <Button title="Save Exercise" onPress={handleSubmit} />

    </View>
  );
}