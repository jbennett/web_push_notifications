class WebPushSubscription < ApplicationRecord
  belongs_to :user

  def publish(data)
    WebPush.payload_send(
      message: data.to_json,
      endpoint: endpoint,
      p256dh: p256dh_key,
      auth: auth_key,
      vapid: {
        private_key: Rails.application.credentials.dig(:web_push, :private_key),
        public_key: Rails.application.credentials.dig(:web_push, :public_key)
      }
    )
  end
end
