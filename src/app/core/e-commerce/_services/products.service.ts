// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { ProductModel } from '../_models/product.model';
import {FormControl} from '@angular/forms';

// const API_PRODUCTS_URL = 'api/products';
const API_PRODUCTS_URL = 'http://localhost:9000/demo/user';
const API_FILE_URL = 'http://localhost:9000/demo/user/file';
// Real REST API
@Injectable()
export class ProductsService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));

	constructor(private http: HttpClient,
		           private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new product to the server
	createProduct(product): Observable<ProductModel> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<ProductModel>(API_PRODUCTS_URL, product, { headers: httpHeaders });
	}

	// READ
	getAllProducts(): Observable<ProductModel[]> {
		return this.http.get<ProductModel[]>(API_PRODUCTS_URL);
	}

	getProductById(productId: number): Observable<ProductModel> {
		return this.http.get<ProductModel>(API_PRODUCTS_URL + `/${productId}`);
	}

	// Server should return filtered/sorted result
	findProducts(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
			// Note: Add headers if needed (tokens/bearer)
			const httpHeaders = this.httpUtils.getHTTPHeaders();
			const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		// const url = API_PRODUCTS_URL + '/find';
		const url = API_PRODUCTS_URL;
			return this.http.get<QueryResultsModel>(url, {
				headers: httpHeaders,
				params:  httpParams
			});
	}

	uploadFile(id: number, avatar: File): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		httpHeaders.append('Content-Type', 'multipart/form-data');
		const formData: any = new FormData();
		formData.append('id', id);
		formData.append('file', avatar);
		return this.http.post(API_FILE_URL, formData, { headers: httpHeaders });
	}

	// UPDATE => PUT: update the product on the server
	updateProduct(product: ProductModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_PRODUCTS_URL, product, { headers: httpHeaders });
	}

	// UPDATE Status
	// Comment this when you start work with real server
	// This code imitates server calls
	updateStatusForProduct(products: ProductModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			productsForUpdate: products,
			newStatus: status
		};
		const url = API_PRODUCTS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the product from the server
	deleteProduct(productId: number): Observable<ProductModel> {
		const url = `${API_PRODUCTS_URL}/${productId}`;
		return this.http.delete<ProductModel>(url);
	}

	deleteProducts(ids: number[] = []): Observable<any> {
		const url = API_PRODUCTS_URL + '/delete';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { prdocutIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
