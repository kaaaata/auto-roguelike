import { Image, FlexContainer, Text } from '../particles';

export const Gold = ({ gold, color = 'yellow' }) => (
  <FlexContainer alignItems='center' justifyContent='center' className='gold'>
    <Image
      src='gold_without_padding.png'
      width={30}
      height={30}
      _css='margin-right: 10px;'
    />
    <Text color={color}>{gold}</Text>
  </FlexContainer>
);
