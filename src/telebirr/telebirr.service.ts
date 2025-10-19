import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import { FabricTokenResponseDto } from './dto/token.response';
import { CreateOrderRequest } from './dto/order.create';
import {
  createNonceStr,
  createTimeStamp,
  signRequestObject,
} from './misc/tools';
import { CreateOrderResponseDto } from './dto/order.response';

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

  async initiatePayment(title: string, amount: number): Promise<string> {
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
      this.httpService.post<CreateOrderResponseDto>(
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

    console.log('Create Order Result:', createOrderResult);

    // 4️⃣ build checkout URL

    const checkoutUrl =
      'https://developerportal.ethiotelebirr.et:38443/payment/web/paygate?' +
      'appid=' +
      this.merchantAppId +
      '&merch_code=' +
      this.merchantCode +
      '&nonce_str=' +
      createOrderResult.nonce_str +
      '&prepay_id=' +
      createOrderResult.biz_content.prepay_id +
      '&timestamp=' +
      createTimeStamp() +
      '&sign=' +
      createOrderResult.sign +
      '&sign_type=SHA256WithRSA&version=1.0';

    // 5️⃣ Build raw request string
    // const rawRequest = this.createRawRequest(prepayId);
    return checkoutUrl;
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
        notify_url:
          'https://bitschoolpaybe-production.up.railway.app/telebirr/notify', // TODO notify URL
        redirect_url: 'https://bitschoolpaybe-production.up.railway.app/', // TODO redirect URL
        appid: this.merchantAppId,
        merch_code: this.merchantCode,
        merch_order_id: this.createMerchantOrderId(),
        trade_type: 'Checkout',
        title,
        total_amount: String(amount),
        trans_currency: 'ETB',
        timeout_express: '120m',
        business_type: 'BuyGoods',
        payee_identifier: this.merchantCode,
        payee_identifier_type: '04',
        payee_type: '5000',
        callback_info: 'From web',
      },
      sign: '',
      sign_type: 'SHA256WithRSA',
    };

    req.sign = signRequestObject(req); // sign the request object
    console.log('Created Telebirr Request Object:', req);
    return req;
  }

  private createMerchantOrderId(): string {
    return new Date().getTime().toString();
  }

  /**
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

  */
}
