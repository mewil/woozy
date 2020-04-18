import styled from 'styled-components';

const Base = styled.div`
  white-space: pre-line;
  font-family: ${({ theme }) => theme.primaryFont}, sans-serif;
`;

export const Title = styled(Base)`
  margin-bottom: 16px;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.2px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

export const Body = styled(Base)`
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
`;

export const BodyFaded = styled(Body)`
  font-size: 13px;
  color: ${({ theme }) => theme.foregroundSecondary};
`;

export const Text = styled(Base)`
  font-size: 13px;
  line-height: 21px;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
`;

export const TextFaded = styled(Text)`
  color: ${({ theme }) => theme.secondary};
`;
