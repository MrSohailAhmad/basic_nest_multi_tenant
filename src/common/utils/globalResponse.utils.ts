export const successResponse = ({
  statusCode = 200,
  message = 'Request SuccessFull',
  payload,
}: {
  statusCode?: number;
  message?: string;
  payload?: any;
}) => {
  return {
    success: true,
    statusCode,
    message,
    payload,
  };
};
