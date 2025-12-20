'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import color from '@/styles/color';
import FormItem from '@/components/common/FormItem/FormItem';
import Input from '@/components/common/Input/Input';
import Select from '@/components/common/Select/Select';
import FileSelector from './FileSelector';
import Button from '@/components/common/Button/Button';
import { useRouter, useParams } from 'next/navigation';

const periodOptions = [
  { value: '1', label: '최근 24시간 이내' },
  { value: '3', label: '최근 3일 이내' },
  { value: '7', label: '최근 7일 이내 (기본)' },
  { value: '30', label: '최근 30일 이내' },
];
export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: '',
    filePath: '',
    description: '',
    period: '7',
  });
  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/repo/${id}/court/summary`);
  };

  return (
    <FormCard>
      <Form onSubmit={handleSubmit}>
        <FormItem label="사건 제목">
          <Input
            placeholder="피해 발생 상황을 요약해주세요 (예: 결제 버튼 클릭 시 500 에러)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </FormItem>

        <FormItem label="용의자 파일">
          <FileInputWrapper>
            <Input
              readOnly
              placeholder="오른쪽 버튼을 눌러 파일을 선택해주세요"
              value={formData.filePath}
              style={{ paddingRight: '100px' }}
            />
            <FileFindButton
              type="button"
              variant="secondary"
              size="small"
              onClick={() => setIsFileSelectorOpen(true)}
            >
              파일 찾기
            </FileFindButton>
          </FileInputWrapper>
        </FormItem>

        <FormItem label="피해 내역 (에러 로그)">
          <Input
            multiline
            placeholder="발생한 에러 메시지나 구체적인 증상을 상세히 기술해주세요."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FormItem>

        <FormItem label="수사 범위">
          <Select
            options={periodOptions}
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value })
            }
          />
        </FormItem>

        <Button type="submit" size="large" fullWidth>
          범인 찾기
        </Button>
      </Form>

      <FileSelector
        isOpen={isFileSelectorOpen}
        onClose={() => setIsFileSelectorOpen(false)}
        onSelect={(path) => setFormData({ ...formData, filePath: path })}
      />
    </FormCard>
  );
}

const FileFindButton = styled(Button)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

const FormCard = styled.div`
  background-color: ${color.darkgray};
  border-radius: 16px;
  padding: 40px;
  border: 1px solid ${color.gray3};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
