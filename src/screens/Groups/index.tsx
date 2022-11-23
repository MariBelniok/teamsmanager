import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import * as S from './styles';

export function Groups() {
  return (
    <S.Container>
      <Header />

      <Highlight title='Turmas' subTitle='Jogue com a sua turma' />
    </S.Container>
  );
}
