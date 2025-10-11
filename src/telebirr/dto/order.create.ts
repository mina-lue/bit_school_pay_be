export interface CreateOrderBizContent {
  notify_url: string;
  appid: string;
  merch_code: string;
  merch_order_id: string;
  trade_type: string;
  title: string;
  total_amount: string;
  trans_currency: string;
  timeout_express: string;
  business_type: string;
  redirect_url: string;
}

export interface CreateOrderRequest {
  timestamp: string;
  nonce_str: string;
  method: string;
  version: string;
  biz_content: CreateOrderBizContent;
  sign: string;
  sign_type: string;
}

export interface CreateOrderResponse {
  biz_content: {
    prepay_id: string;
  };
  // add more fields if needed
}

export interface initiatePaymentResponseDto {
  response: {
    appid: string;
    merch_code: string;
    nonce_str: string;
    prepay_id: string;
    timestamp: string;
    sign: string;
    sign_type: string;
  };
}

export interface RawRequestDto {
  appid: string;
  merch_code: string;
  nonce_str: string;
  prepay_id: string;
  timestamp: string;
  sign: string;
  sign_type: string;
}

export interface CreateOrderDataDto {
  title: string;
  amount: number;
}
