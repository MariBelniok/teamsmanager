import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Loading } from '@components/Loading';
import { Button } from '@components/Button';

import { GroupsGetAll } from '@storage/group/groupsGetAll';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setLoading(true);
      const data = await GroupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight title='Turmas' subTitle='Jogue com a sua turma' />

      {
        loading 
          ? <Loading /> 
          : <FlatList 
              data={groups}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <GroupCard 
                  title={item}
                  onPress={() => navigation.navigate('players', { group: item })}
                />
              )}
              contentContainerStyle={groups.length === 0 && { flex: 1 }}
              ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
            />
      }
      
      <Button 
        title='Criar nova turma' 
        onPress={handleNewGroup}
      />
    </Container>
  );
}
