export const bodyToFormData = <T extends Record<string, unknown>>(body: T) => {
  const fd = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      fd.append(key, value);

      return;
    }

    fd.append(key, String(value));
  });
  return fd;
};
