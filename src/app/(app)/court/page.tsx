'use client';

import styled from '@emotion/styled';
import ComplaintForm from '@/components/features/court/ComplaintForm';
import color from '@/styles/color';
import font from '@/styles/font';
import Courthouse from '../../../../public/assets/Courthouse';

export default function CourtPage() {
  return (
    <PageContainer>
      <MainContent>
        <HeaderSection>
          <Title>
            <Courthouse width={48} />
            고소장 작성
          </Title>
          <Subtitle>
            버그의 원인을 찾고 범인을 색출하기 위한 고소장을 작성해주세요.
          </Subtitle>
        </HeaderSection>

        <ComplaintForm />
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${color.black};
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;

const Title = styled.h1`
  ${font.D1}
  color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  ${font.p1}
  color: ${color.lightgray};
`;
