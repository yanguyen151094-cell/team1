import { useCallback, useState } from 'react';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface UseFormSubmitResult {
  status: FormStatus;
  message: string;
  submit: (form: HTMLFormElement) => Promise<boolean>;
  reset: () => void;
}

const SUCCESS_MESSAGE =
  'Đã ghi nhận thông tin của bạn. Người phụ trách sẽ liên hệ lại trong thời gian sớm nhất.';

export default function useFormSubmit(submitAddr: string): UseFormSubmitResult {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState<string>('');

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage('');
  }, []);

  const submit = useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form);

      const honeyValue = formData.get('website_alt');
      const honey = typeof honeyValue === 'string' ? honeyValue.trim() : '';
      if (honey) {
        setStatus('success');
        setMessage(SUCCESS_MESSAGE);
        form.reset();
        return true;
      }

      setStatus('submitting');
      setMessage('');

      const payload = new URLSearchParams();
      formData.forEach((value, key) => {
        if (key === 'website_alt') return;
        if (typeof value !== 'string') return;
        const trimmed = value.trim();
        if (!trimmed) return;
        payload.append(key, trimmed);
      });

      try {
        const response = await fetch(submitAddr, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        });

        const responseText = await response.text();
        let parsed: unknown = null;
        try {
          parsed = JSON.parse(responseText);
        } catch {
          parsed = null;
        }

        const record = (parsed ?? {}) as {
          code?: string;
          message?: string;
          meta?: { message?: string; detail?: string };
        };

        const serverMsg =
          record?.meta?.message || record?.message || record?.meta?.detail || responseText;
        const serverCode = record?.code;
        const lowered = typeof serverMsg === 'string' ? serverMsg.toLowerCase() : '';
        const isSpam = lowered.includes('spam');

        if (!response.ok || isSpam || (serverCode !== undefined && serverCode !== 'OK')) {
          setStatus('error');
          const readable =
            typeof serverMsg === 'string' && serverMsg.length > 0 && serverMsg.length < 180
              ? serverMsg
              : 'Gửi thông tin chưa thành công. Vui lòng kiểm tra lại và thử lại.';
          setMessage(readable);
          return false;
        }

        setStatus('success');
        setMessage(SUCCESS_MESSAGE);
        form.reset();
        return true;
      } catch {
        setStatus('error');
        setMessage('Không kết nối được máy chủ. Vui lòng kiểm tra đường truyền rồi thử lại.');
        return false;
      }
    },
    [submitAddr],
  );

  return { status, message, submit, reset };
}