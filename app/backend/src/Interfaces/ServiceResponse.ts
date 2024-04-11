export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'OK',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
