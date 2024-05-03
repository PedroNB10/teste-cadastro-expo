import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";

export default function App() {
  const [produtoId, setProdutoId] = useState("");

  const adicionarAoCarrinho = async () => {
    try {
      const response = await axios.post(
        "http://capacitacao.byronsolutions.com:3000/carrinho/adicionar/" +
          produtoId,
        {}, // Corpo da requisição vazio, pois o ID do produto é passado na URL
        {
          headers: {
            Authorization: "Bearer seu_token",
          },
        }
      );
      Alert.alert("Sucesso", "Produto adicionado ao carrinho!");
      console.log(response.data);
      console.log(response.status);
    } catch (error) {
      console.log(error.response.data.msg);
      console.log(error.response.status);
      Alert.alert(
        "Erro",
        "Houve um problema ao adicionar o produto ao carrinho."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID do Produto"
        value={produtoId}
        onChangeText={setProdutoId}
        keyboardType="numeric"
      />
      <Button title="Adicionar ao Carrinho" onPress={adicionarAoCarrinho} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
