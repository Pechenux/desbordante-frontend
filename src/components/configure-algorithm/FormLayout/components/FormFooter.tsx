import { useRouter } from 'next/navigation';
import IdeaIcon from '@/assets/icons/idea.svg?component';
import { Button } from '@/components/common/uikit/Button';

export const FormFooter = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => router.push('/create-task/choose-file')}
      >
        Go Back
      </Button>
      <Button
        variant="primary"
        icon={<IdeaIcon />}
        type="submit"
        form="algorithmconfigurator"
      >
        Analyze
      </Button>
    </>
  );
};
