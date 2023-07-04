class DeliveryMethods::WebPush < Noticed::DeliveryMethods::Base
    def deliver
        recipient.web_push_subscriptions.each do |subscription|
            subscription.publish(notification.data)
        end
    end
end
