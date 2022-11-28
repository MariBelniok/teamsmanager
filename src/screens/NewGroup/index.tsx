import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Loading } from "@components/Loading";

import { groupCreate } from "@storage/group/groupCreate";

import { AppError } from "@utils/AppError";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const [group, setGroup] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleNew() {
    try {
      setLoading(true);
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      await groupCreate(group);
      navigation.navigate('groups')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo');
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight title='Nova turma' subTitle='Crie a turma para adicionar as pessoas' />

        {
          loading 
            ? <Loading />
            : <Input 
                placeholder="Nome da turma"
                onChangeText={setGroup}
              /> 
        }
  
        <Button 
          title='Criar' 
          style={{ marginTop: 20 }}
          onPress={handleNew}  
        />
      </Content>

    </Container>
  )
}