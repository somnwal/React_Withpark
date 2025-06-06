import { useState } from 'react';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Input from "@withpark/ui/components/Input";
import Textarea from "@withpark/ui/components/Textarea";
import Label from "@withpark/ui/components/Label";
import FormGroup from "@withpark/ui/components/FormGroup";
import useCreatePostMutation from "../../../api/mutations/useCreatePostMutation";
import type { CreatePostRequest } from "../../../types/community";

interface PostFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const PostForm = ({ onClose, onSuccess }: PostFormProps) => {
  const createPostMutation = useCreatePostMutation();
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: '',
    content: '',
    imageUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl?.trim() || undefined,
      });
      
      // 폼 초기화
      setFormData({ title: '', content: '', imageUrl: '' });
      
      alert('게시글이 성공적으로 작성되었습니다.');
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const handleInputChange = (field: keyof CreatePostRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card title="새 게시글 작성">
      <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="게시글 제목을 입력해주세요"
            maxLength={200}
          />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <Textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="게시글 내용을 입력해주세요"
            rows={8}
            style={{ minHeight: '200px' }}
          />
        </FormGroup>

        <FormGroup>
          <Label>이미지 URL (선택사항)</Label>
          <Input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </FormGroup>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {onClose && (
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              취소
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={createPostMutation.isPending}
          >
            {createPostMutation.isPending ? '작성 중...' : '게시하기'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PostForm; 