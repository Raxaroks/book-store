import { HttpMethod, IService } from '@/types';
import { IGenericOptions } from '@/types/services';

class HttpService {
	constructor() {}

  // setup headers
  private setupHeaders(hasAttachment: boolean, method: HttpMethod) {
    if (method === 'DELETE') return { "Content-Type": "text/html" }
    return hasAttachment
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };
  }

	// Normalize errors
	private normalizeError(error: any) {
		return Promise.reject(error);
	}

	private async request<T>(
		method: HttpMethod,
		{ url, params, options }: IGenericOptions,
    hasAttachment: boolean = false
	): Promise<T | void> {
		try {
			if (params) url = `${url}?${new URLSearchParams(params)}`;

      if (method !== 'DELETE') {
        let response = await fetch(url, {
          method,
          headers: this.setupHeaders(hasAttachment, method),
          cache: 'no-store'
        });
  
        return response.json();
      }
			
      await fetch(url, {
        method,
        headers: this.setupHeaders(hasAttachment, method),
        cache: 'no-store'
      });
      return;
		} catch (error) {
			return this.normalizeError(error);
		}
	}

  // perform GET request
  public async get<T>(
    url: string,
    params?: IService.IParams,
    hasAttachment: boolean = false
  ): Promise<T> {
    return this.request<T>(HttpMethod.GET, { url, params }, hasAttachment) as T; 
  }

  // perform POST request
  public async post<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment: boolean = false
  ): Promise<T> {
    return this.request<T>(HttpMethod.POST, { url, params, options: { body: JSON.stringify(payload) } }, hasAttachment) as T
  }

  // perform PUT request
  // perform DELETE request
  public async delete<T>(
    url:  string,
    params?: IService.IParams,
    hasAttachment: boolean = false
  ): Promise<T> {
    return this.request<T>(HttpMethod.DELETE, { url, params }) as T;
  }
}

export default HttpService;
