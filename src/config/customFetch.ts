import logger from '@/utils/logger.config';
import { constants } from './constants';

const { API_KEY } = constants;

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface FetchError extends Error {
  status?: number;
  statusText?: string;
  url?: string;
}

class CustomFetchError extends Error implements FetchError {
  status?: number;
  statusText?: string;
  url?: string;

  constructor(message: string, status?: number, statusText?: string, url?: string) {
    super(message);
    this.name = 'CustomFetchError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = 2;
const DEFAULT_RETRY_DELAY = 1000;

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const isRetryableError = (error: CustomFetchError): boolean => {
  if (error.name === 'AbortError') return true;
  if (error.status && error.status >= 500) return true;
  if (error.status === 429) return true;
  return false;
};

const createTimeoutSignal = (timeout: number): AbortSignal => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller.signal;
};

const logRequest = (url: string, options: RequestInit): void => {
    logger({
      method: options.method || 'GET',
      headers: options.headers,
      url: url,
    });
};

const logError = (error: CustomFetchError, attempt: number): void => {
    logger({
      url: error.url,
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      attempt,
    });
};

const logSuccess = (url: string, status: number): void => {
  logger({
    url: url,
    status: status,
  });
};

async function customFetch(
  url: string, 
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    ...fetchOptions
  } = options;

  let lastError: CustomFetchError;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      logRequest(url, fetchOptions);

      const timeoutSignal = createTimeoutSignal(timeout);
      const combinedSignal = fetchOptions.signal 
        ? AbortSignal.any([timeoutSignal, fetchOptions.signal])
        : timeoutSignal;

      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        signal: combinedSignal,
      });

      if (!response.ok) {
        throw new CustomFetchError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText,
          url
        );
      }

      logSuccess(url, response.status);
      return response;

    } catch (error) {
      lastError = error instanceof CustomFetchError 
        ? error 
        : new CustomFetchError(
            error instanceof Error ? error.message : 'Unknown error',
            undefined,
            undefined,
            url
          );

      logError(lastError, attempt);

      if (attempt > retries) {
        break;
      }

      if (!isRetryableError(lastError)) {
        break;
      }

      const delay = retryDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }

  throw lastError!;
}

export default customFetch;
export { CustomFetchError, type FetchOptions, type FetchError };