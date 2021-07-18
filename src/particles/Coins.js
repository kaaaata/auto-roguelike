import { Image, FlexContainer, Text } from '../particles';

export const Coins = ({ coins, color = 'yellow' }) => (
  <FlexContainer alignItems='center' justifyContent='center' className='gold'>
    <Image
      src='coins.png'
      width={30}
      height={30}
      _css='margin-right: 10px;'
    />
    <Text color={color}>{coins}</Text>
  </FlexContainer>
);
