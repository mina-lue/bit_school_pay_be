export interface CreateOrderResponseDto {
  result: string;
  code: string;
  msg: string;
  nonce_str: string;
  sign: string;
  sign_type: string;
  biz_content: {
    merch_order_id: string;
    prepay_id: string;
  };
}
