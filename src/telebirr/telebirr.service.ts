import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import { FabricTokenResponseDto } from './dto/token.response';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  RawRequestDto,
} from './dto/order.create';
import {
  createNonceStr,
  createTimeStamp,
  signRequestObject,
} from './misc/tools';

@Injectable()
export class TelebirrService {
  private baseUrl = 'https://196.188.120.3:38443/apiaccess/payment/gateway';
  private appKey = 'c4182ef8-9249-458a-985e-06d191f4d505';
  private appSecret = 'fad0f06383c6297f545876694b974599';
  private fabricAppId = 'c4182ef8-9249-458a-985e-06d191f4d505';
  private merchantAppId = '1469440255846403';
  private merchantCode = '357871';

  constructor(private readonly httpService: HttpService) {}

  async getToken(): Promise<string> {
    const url = `${this.baseUrl}/payment/v1/token`;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false }); // ignore self-signed certs

    const response = await firstValueFrom(
      this.httpService.post<FabricTokenResponseDto>(
        url,
        { appSecret: this.appSecret },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-APP-Key': this.appKey,
          },
          httpsAgent,
        },
      ),
    );

    return response.data.token;
  }

  async initiatePayment(title: string, amount: number) {
    // 1️⃣ Get Fabric token
    const fabricToken = await this.getToken();

    // 2️⃣ Create order request object
    const reqObject: CreateOrderRequest = this.createRequestObject(
      title,
      amount,
    );

    // 3️⃣ Send request to Telebirr
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const { data: createOrderResult } = await firstValueFrom(
      this.httpService.post<CreateOrderResponse>(
        `${this.baseUrl}/payment/v1/inapp/createOrder`,
        reqObject,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-APP-Key': this.fabricAppId,
            Authorization: fabricToken,
          },
          httpsAgent,
        },
      ),
    );

    // 4️⃣ Extract prepay_id
    const prepayId = createOrderResult.biz_content.prepay_id;

    // 5️⃣ Build raw request string
    const rawRequest = this.createRawRequest(prepayId);
    return rawRequest;
  }

  // Helper to create order request object (same as Node.js code)
  private createRequestObject(
    title: string,
    amount: number,
  ): CreateOrderRequest {
    const req: CreateOrderRequest = {
      timestamp: createTimeStamp(),
      nonce_str: createNonceStr(),
      method: 'payment.preorder',
      version: '1.0',
      biz_content: {
        notify_url: 'https://www.google.com', // replace with your notify URL
        appid: this.merchantAppId,
        merch_code: this.merchantCode,
        merch_order_id: this.createMerchantOrderId(),
        trade_type: 'Checkout',
        title,
        total_amount: String(amount),
        trans_currency: 'ETB',
        timeout_express: '120m',
        business_type: 'BuyGoods',
        redirect_url: 'https://www.baidu.com', // replace with your redirect URL
      },
      sign: '',
      sign_type: 'SHA256WithRSA',
    };

    req.sign = signRequestObject(req); // sign the request object
    return req;
  }

  private createMerchantOrderId(): string {
    return new Date().getTime().toString();
  }

  private createRawRequest(prepayId: string): RawRequestDto {
    const map = {
      appid: this.merchantAppId,
      merch_code: this.merchantCode,
      nonce_str: createNonceStr(),
      prepay_id: prepayId,
      timestamp: createTimeStamp(),
    };

    const sign = signRequestObject(map);

    return {
      ...map,
      sign,
      sign_type: 'SHA256WithRSA',
    };
  }
}
